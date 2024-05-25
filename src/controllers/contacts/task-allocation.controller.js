const httpStatus = require('http-status');
const ApiError = require('../../utils/ApiError');
const catchAsync = require('../../utils/catchAsync');
const { individualService } = require('../../services');

const getTotalHours = catchAsync(async (req, res) => {
    const individual = await individualService.getIndividualById(req.body.id);
    if (!individual) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Individual not found');
    }
    const monthlyHours = await hours(req.body.startDate, req.body.endDate, individual.primaryDetails.PrefferedWorkingHours);
    res.send(monthlyHours);
});

const hours = async (start, end, workingHoursPerDay) => {
    const startDate = new Date(start); // Define your start date here
    const endDate = new Date(end);  // Define your end date here

    const quarterlyHours = await calculateQuarterlyWorkingHours(new Date(startDate).getFullYear(), startDate, endDate, workingHoursPerDay);
    const monthlyHours = await calculateMonthlyWorkingHours(new Date(startDate).getFullYear(), startDate, endDate, workingHoursPerDay);
    const weeklyHours = await calculateWeeklyWorkingHours(startDate, endDate, workingHoursPerDay);

    return [{ quarterly: quarterlyHours, monthly: monthlyHours, weekly: weeklyHours }];
}

function calculateWeeklyWorkingHours(startDate, endDate, workingHoursPerDay) {
    const weeks = [];
    let currentStartDate = new Date(startDate);
    let currentEndDate = new Date(endDate);

    // Adjust currentStartDate to the beginning of the week (Monday)
    while (currentStartDate.getDay() !== 1) {
        currentStartDate.setDate(currentStartDate.getDate() - 1);
    }

    while (currentStartDate <= currentEndDate) {
        let endOfWeek = new Date(currentStartDate);
        endOfWeek.setDate(currentStartDate.getDate() + 6); // End of the week (Sunday)

        const start = currentStartDate < startDate ? startDate : currentStartDate;
        const end = endOfWeek > endDate ? endDate : endOfWeek;

        weeks.push({
            name: getWeekNumber(currentStartDate),
            time: 0,
            hours: calculateWorkingHours(start, end, workingHoursPerDay)
        });

        // Move to the next week
        currentStartDate.setDate(currentStartDate.getDate() + 7);
    }

    return weeks.filter(week => week.hours > 0);
}

function calculateWorkingHours(startDate, endDate, workingHoursPerDay) {
    let totalWorkingHours = 0;
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        if (isWeekday(currentDate)) {
            totalWorkingHours += workingHoursPerDay;
        }
        currentDate = getNextDay(currentDate);
    }

    return totalWorkingHours;
}

function getQuarterStartEndDates(year, startDate, endDate) {
    const quarterStartDates = [
        new Date(year, 0, 1),
        new Date(year, 3, 1),
        new Date(year, 6, 1),
        new Date(year, 9, 1)
    ];

    return quarterStartDates
        .map(start => [start, new Date(new Date(start).getFullYear(), start.getMonth() + 3, 0)])
        .filter(([start, end]) => (start >= startDate && start <= endDate) || (end >= startDate && end <= endDate));
}

function calculateQuarterlyWorkingHours(year, startDate, endDate, workingHoursPerDay) {
    const quarters = getQuarterStartEndDates(year, startDate, endDate);
    return quarters.map(([start, end], index) => ({
        name: `Q${index + 1}`,
        time: 0,
        hours: calculateWorkingHours(start < startDate ? startDate : start, end > endDate ? endDate : end, workingHoursPerDay)
    }));
}

function calculateMonthlyWorkingHours(year, startDate, endDate, workingHoursPerDay) {
    return Array.from({ length: 12 }, (_, month) => {
        const start = new Date(year, month, 1);
        const end = new Date(year, month + 1, 0);
        return {
            name: start.toLocaleString('default', { month: 'long' }),
            time: 0,
            hours: calculateWorkingHours(start < startDate ? startDate : start, end > endDate ? endDate : end, workingHoursPerDay)
        };
    }).filter(month => month.hours > 0);
}

function isWeekday(date) {
    const day = date.getDay();
    return day !== 0 && day !== 6; // 0 = Sunday, 6 = Saturday
}

function getNextDay(date) {
    const nextDay = new Date(date);
    nextDay.setDate(date.getDate() + 1);
    return nextDay;
}

function getWeekNumber(date) {
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - startOfYear) / 86400000;
    return "Week " + Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);
}

module.exports = {
    getTotalHours,
};