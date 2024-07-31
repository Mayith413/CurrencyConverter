const apiKey = '01a27eb2750dc55b76a90347e43b7909';

document.getElementById('amount').addEventListener('input', convertCurrency);
document.getElementById('fromCurrency').addEventListener('change', convertCurrency);
document.getElementById('toCurrency').addEventListener('change', convertCurrency);

async function fetchExchangeRate(baseCurrency, targetCurrency) {
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
    const data = await response.json();
    return data.rates[targetCurrency];
}

async function convertCurrency() {
    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;

    if (isNaN(amount) || !amount) {
        document.getElementById('result').innerText = '0';
        return;
    }

    const rate = await fetchExchangeRate(fromCurrency, toCurrency);

    if (!rate) {
        alert('Exchange rate not available');
        return;
    }

    const result = amount * rate;
    const toCurrencySymbol = document.querySelector(`#toCurrency option[value="${toCurrency}"]`).getAttribute('data-symbol');
    document.getElementById('result').innerText = `${toCurrencySymbol}${result.toFixed(2)}`;
}

// Initialize conversion on page load
convertCurrency();
