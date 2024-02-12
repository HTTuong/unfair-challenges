export function convertValueToWeek(value: number) {
    switch (value.toFixed(1)) {
        case '0':
            return 'Monday'
        case '16.6':
            return 'Tuesday'
        case '33.3':
            return 'Wednesday'
        case '50':
            return 'Thursday'
        case '66.6':
            return 'Friday'
        case '83.3':
            return 'Saturday'
        case '100':
            return 'Sunday'
    }
}
