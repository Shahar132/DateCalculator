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

    // Calculate the remaining days after the complete months
    const millisecondsPerDay = 1000 * 60 * 60 * 24;

    const remainingDays = Math.round(
        (endDate - currentDate) / millisecondsPerDay
    );

    const weeks = Math.floor(remainingDays / 7);
    const days = remainingDays % 7;

    // The month in which the period ends
    const lastMonth = endDate.toLocaleDateString("he-IL", {
        month: "long",
        year: "numeric"
    });

    resultDiv.innerHTML = `
        <p><strong>סה״כ:</strong> ${months} חודשים, ${weeks} שבועות ו-${days} ימים</p>
        <p><strong>החודש האחרון:</strong> ${lastMonth}</p>
    `;
}


// Adds one calendar month while handling months with different lengths
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