class DateHelper
{
    static fromString(date: string): Date
    {
        return new Date(date);
    }

    static toStringDate(date: Date | string): string
    {
        if (typeof date === "string")
            date = new Date(date)

        return this.year(date) + "-" + this.month(date) + "-" + this.day(date)
    }

    static toStringDateTime(date: Date | string): string
    {
        if (typeof date === "string")
            date = new Date(date)

        return this.toStringDate(date) + " " + this.hour(date) + ":" + this.minute(date) + ":" + this.second(date);
    }

    /*** Private ***/
    private static zeroPad(num: number, expected: number): string
    {
        let str = num.toString();
        str.padStart(expected, '0')
        return str;
    }

    private static year(date: Date): string
    {
        return this.zeroPad(date.getFullYear(), 4)
    }

    private static month(date: Date): string
    {
        return this.zeroPad(date.getMonth(), 2)
    }

    private static day(date: Date): string
    {
        return this.zeroPad(date.getDate(), 2)
    }

    private static hour(date: Date): string
    {
        return this.zeroPad(date.getHours(), 2)
    }

    private static minute(date: Date): string
    {
        return this.zeroPad(date.getMinutes(), 2)
    }

    private static second(date: Date): string
    {
        return this.zeroPad(date.getSeconds(), 2)
    }
}

export {DateHelper}