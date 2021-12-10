export function numToRoman(num){
    // var s = '', t;
  
    // while (num > 0) {
    //   t = (num - 1) % 26;
    //   s = String.fromCharCode(65 + t) + s;
    //   num = (num - t)/26 | 0;
    // }
    // return s || undefined;
    if (isNaN(num))
    return NaN;
    var digits = String(+num).split(""),
        key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
            "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
            "","I","II","III","IV","V","VI","VII","VIII","IX"],
        roman = "",
        i = 3;
    while (i--)
        roman = (key[+digits.pop() + (i * 10)] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
  }
