import {DateHelper} from "../lib/helpers";

let d = new Date('2021-12-31 05:05:05');

test('string to date', () => {
    let stringDate = DateHelper.toStringDate(d)
    return expect(stringDate).toEqual("2021-12-31")
})

test('string to datetime', () => {
    let stringDate = DateHelper.toStringDateTime(d)
    return expect(stringDate).toEqual("2021-12-31 05:05:05")
})

test('date from string', () => {
    let fromStringDate = DateHelper.fromString(d)
    return expect(fromStringDate).toEqual(d);
})