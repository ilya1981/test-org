import CardValidator from "./card-validator";

beforeEach(() => {
  document.body.innerHTML = `
    <div class="widget-container">
      <div class="payment-icons">
        <img alt="Visa" class="payment-icon__pic active-icon__pic" src="./img/visa.png">
        <img alt="Mastercard" class="payment-icon__pic" src="./img/mastercard.png">
        <img alt="American Express" class="payment-icon__pic" src="./img/amex.png">
        <img alt="Discover" class="payment-icon__pic" src="./img/discover.png">
        <img alt="JCB" class="payment-icon__pic" src="./img/jcb.png">
        <img alt="Diners Club" class="payment-icon__pic" src="./img/dinersclub.png">
      </div>
      <div class="input-container">
        <label class="card-input-label">
          <input class="input-text" placeholder="4111111111111111" type="text">
        </label>
        <button class="validate-button">Click to Validate</button>
      </div>
    </div>
  `;
});

describe("CardValidator - luhn algorithm tests", () => {
  let validator;

  beforeEach(() => {
    validator = new CardValidator(".widget-container");
  });

  const luhnTestCases = [
    ["4111111111111111", true, "Valid Visa 16 digits"],
    ["4556737586899855", true, "Valid Visa 16 digits"],
    ["4929804463622135592", true, "Valid Visa 19 digits"],
    ["5555555555554444", true, "Valid Mastercard"],
    ["378282246310005", true, "Valid American Express"],
    ["4111111111111112", false, "Invalid Visa"],
    ["6011111111111117", true, "Valid Discover"],
    ["3530111333300000", true, "Valid JCB"],
    ["30569309025904", true, "Valid Diners Club"],
    ["1234567890123456", false, "Random invalid number"],
    ["4012888888881881", true, "Another valid Visa 16 digits"]
  ];

  test.each(luhnTestCases)(
    "luhnCheck(%s) should return %s for %s",
    (cardNumber, expected, description) => {
      expect(validator.luhnCheck(cardNumber)).toBe(expected);
    },
  );
});

describe("CardValidator - card types tests", () => {
  let validator;

  beforeEach(() => {
    validator = new CardValidator(".widget-container");
  });

  const cardTypeTestCases = [
    ["4532947732644456", "visa", "Visa 16 digits"],
    ["4532454962676886", "visa", "Visa 16 digits"],
    ["4929662140361836686", "visa", "Visa 19 digits"],
    ["5115575153697935", "mastercard", "MasterCard 16 digits"],
    ["2221002045538167", "mastercard", "MasterCard 16 digits"],
    ["2221002315409875", "mastercard", "MasterCard 16 digits"],
    ["6011432198333527", "discover", "Discover 16 digits"],
    ["6011035609169628", "discover", "Discover 16 digits"],
    ["6011338962241439558", "discover", "Discover 19 digits"],
    ["3540036632452459", "jcb", "JCB 16 digits"],
    ["3534703970245583", "jcb", "JCB 16 digits"],
    ["3528056813256811957", "jcb", "JCB 19 digits"],
    ["30330016420650", "diners club", "Diners Club 14 digits"],
    ["36856588060064", "diners club", "Diners Club 14 digits"],
    ["30230608646607", "diners club", "Diners Club 14 digits"],
    ["2201382000000021", "mir", "MIR 16 digits"],
    ["2201382000000039", "mir", "MIR 16 digits"],
    ["2204290100000006", "mir", "MIR 16 digits"]
  ];

  test.each(cardTypeTestCases)(
    "getCardType should return %s for %s, %s",
    (cardNumber, expectedType, description) => {
      expect(validator.getCardType(cardNumber)).toBe(expectedType);
    },
  );
});
