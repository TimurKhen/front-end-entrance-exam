const parseDate = (dateStr) => {
    if (!dateStr) return new Date(0);

    const [month, year] = dateStr.split(', ');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthIndex = months.indexOf(month.trim());
    return new Date(year, monthIndex);
};

export function sortFunction(data) {
    return [...data].sort((a, b) => {
        const aStartDate = parseDate(a.startDate);
        const bStartDate = parseDate(b.startDate);

        if (a.endDate === "" && b.endDate !== "") return -1;
        if (a.endDate !== "" && b.endDate === "") return 1;

        if (aStartDate > bStartDate) return -1;
        if (aStartDate < bStartDate) return 1;

        return 0;
    });
}
