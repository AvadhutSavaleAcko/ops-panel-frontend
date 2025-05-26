import { ROUND_TO_1_DECIMAL } from "./index";

export function getInrFormat(
  number: string | number | null,
  symbol = false
): string {
  if (!number) {
    return "";
  }
  number = Math.round(Number(number));
  const y = `${number}`.split(".");
  const x = y[0].toString();
  let lastThree = x.substring(x.length - 3);
  const otherNumbers = x.substring(0, x.length - 3);
  if (otherNumbers !== "") lastThree = `,${lastThree}`;
  let result = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
  if (symbol) result = `₹ ${result}`;
  return result;
}

export function getNumberFormat(value: any) {
  if (!value) {
    return;
  }
  let result = value.replace(/,/g, "");
  result = result.replace("₹", "");
  return result?.trim();
}

export function convertToLakh(number?: string | number, toK?: boolean) {
  if (!number) {
    return 0;
  }

  if (toK) {
    return (
      Math.floor(
        ((typeof number === "string" ? parseInt(number, 10) : number) / 1000) *
          100
      ) / 100
    );
  }

  return (
    Math.floor(
      ((typeof number === "string" ? parseInt(number, 10) : number) / 100000) *
        100
    ) / 100
  );
}

export function convertToLakhMin(number?: string | number, toK?: boolean) {
  if (!number) {
    return 0;
  }

  if (toK) {
    return (
      Math.floor(
        ((typeof number === "string" ? parseInt(number, 10) : number) / 1000) *
          100
      ) / 100
    );
  }

  return (
    Math.floor(
      ((typeof number === "string" ? parseInt(number, 10) : number) / 100000) *
        100
    ) / 100
  );
}

const inrFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR"
});

export function formatToINR(
  amount?: number | null | string,
  symbol = false,
  stripZeros = true
): string {
  if (!amount) {
    return "";
  }

  const amountToFormat = stripZeros ? Math.round(Number(amount)) : amount;

  let inrString = inrFormatter.format(Number(amountToFormat));
  if (stripZeros) {
    inrString = inrString.replace(/\.00/g, "");
  }

  if (!symbol) {
    inrString = inrString.replace("₹", "");
  }

  return inrString;
}

export function getShortAmountString(amount?: number | null) {
  if (!amount) {
    return "";
  }

  if (amount >= 1_00_000) {
    let formattedAmount = inrFormatter.format(amount / 1_00_000);
    const { length } = formattedAmount;

    if (formattedAmount.charAt(length - 1) === "0") {
      formattedAmount = formattedAmount.substr(0, length - 1);
    }

    return `${formattedAmount}L`;
  }

  return formatToINR(amount, true);
}

export const convertAmountToAmountWithUnits = (
  money: number,
  conversion: string = "floor"
) => {
  const formatter = new Intl.NumberFormat("en-IN");

  const roundMoney = (money: number, method: string) => {
    if (method === ROUND_TO_1_DECIMAL) {
      return parseFloat(money?.toFixed(1));
    }
    return Math[method](money);
  };

  if (money >= 10000000) {
    const crores = roundMoney(money / 10000000, conversion);
    return formatter.format(crores) + " crores";
  } else if (money >= 100000) {
    const lakhs = roundMoney(money / 100000, conversion);
    return formatter.format(lakhs) + " lakhs";
  } else if (money >= 1000) {
    const thousands = roundMoney(money / 1000, conversion);
    return formatter.format(thousands) + "k";
  } else {
    return formatter.format(money);
  }
};