export function pad2(number) {
    number = Number(number);
    return (number < 10 ? '0' : '') + number
}