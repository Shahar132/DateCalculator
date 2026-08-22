const calculateBtn = document.getElementById("calculateBtn");
const startDateInput = document.getElementById("startDate");
const endDateInput = document.getElementById("endDate");
const resultDiv = document.getElementById("result");

calculateBtn.addEventListener("click", calculatePeriod);

function calculatePeriod() {
    const startDate = new Date(startDateInput.value);
    const endDate = new Date(endDateInput.value);

    // Check that both dates were selected
    if (!startDateInput.value || !endDateInput.value) {
        resultDiv.innerHTML = "יש לבחור תאריך התחלה ותאריך סיום.";
        return;
    }

    // End date must be after start date
    if (endDate < startDate) {
        resultDiv.innerHTML = "תאריך הסיום חייב להיות אחרי תאריך ההתחלה.";
        return;
    }

    let currentDate = new Date(startDate);
    let months = 0;

    // Count complete calendar months
    while (true) {
        const nextMonth = addOneMonth(currentDate);

        if (nextMonth <= endDate) {
            months++;
            currentDate = nextMonth;
        } else {
            break;
        }
    }

    // Calculate remaining days
    const millisecondsPerDay = 1000 * 60 * 60 * 24;

    const remainingDays = Math.round(
        (endDate - currentDate) / millisecondsPerDay
    );

    const weeks = Math.floor(remainingDays / 7);
    const days = remainingDays % 7;

    // Get the final month
    const lastMonth = endDate.toLocaleDateString("he-IL", {
        month: "long",
        year: "numeric"
    });

    resultDiv.innerHTML = `
        <p><strong>סה״כ:</strong> ${months} חודשים, ${weeks} שבועות ו-${days} ימים</p>
        <p><strong>החודש האחרון:</strong> ${lastMonth}</p>
    `;
}


// Adds one calendar month safely
function addOneMonth(date) {
    const originalDay = date.getDate();

    const newDate = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        1
    );

    const lastDayOfNewMonth = new Date(
        newDate.getFullYear(),
        newDate.getMonth() + 1,
        0
    ).getDate();

    newDate.setDate(
        Math.min(originalDay, lastDayOfNewMonth)
    );

    return newDate;
}


// ======================================================
// Guarantee calculator
// ======================================================

const guaranteeDateInput = document.getElementById("guaranteeDate");
const guaranteeYearsInput = document.getElementById("guaranteeYears");
const guaranteeMonthsInput = document.getElementById("guaranteeMonths");
const guaranteeBtn = document.getElementById("guaranteeBtn");
const guaranteeResult = document.getElementById("guaranteeResult");

guaranteeBtn.addEventListener("click", calculateGuaranteeDate);

function calculateGuaranteeDate() {

    // Check that a start date was selected
    if (!guaranteeDateInput.value) {
        guaranteeResult.innerHTML = "יש לבחור תאריך התחלה.";
        return;
    }

    const years = Number(guaranteeYearsInput.value);
    const months = Number(guaranteeMonthsInput.value);

    // Validate period values
    if (
        years < 0 ||
        months < 0 ||
        !Number.isInteger(years) ||
        !Number.isInteger(months)
    ) {
        guaranteeResult.innerHTML =
            "יש להזין מספר תקין של שנים וחודשים.";
        return;
    }

    const startDate = new Date(guaranteeDateInput.value);

    // Convert the entire period to months
    const totalMonths = (years * 12) + months;

    const endDate = addMonthsSafe(startDate, totalMonths);

    const formattedDate = endDate.toLocaleDateString("he-IL");

    guaranteeResult.innerHTML = `
        <p>
            <strong>תקופת הערבות:</strong>
            ${years} שנים ו-${months} חודשים
        </p>

        <p>
            <strong>תאריך סיום הערבות:</strong>
            ${formattedDate}
        </p>
    `;
}


// Adds months while handling different month lengths
function addMonthsSafe(date, monthsToAdd) {
    const originalDay = date.getDate();

    const targetDate = new Date(
        date.getFullYear(),
        date.getMonth() + monthsToAdd,
        1
    );

    const lastDayOfTargetMonth = new Date(
        targetDate.getFullYear(),
        targetDate.getMonth() + 1,
        0
    ).getDate();

    targetDate.setDate(
        Math.min(originalDay, lastDayOfTargetMonth)
    );

    return targetDate;
}