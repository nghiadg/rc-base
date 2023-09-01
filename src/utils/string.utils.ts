export class StringUtils {
  static format(s: string, ...args: string[]) {
    return s.replace(/{([0-9]+)}/g, function (match: string, index: number) {
      return String(typeof args[index] === "undefined" ? match : args[index]);
    });
  }
}
