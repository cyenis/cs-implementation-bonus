// Get the table body where results will be displayed
const resultsTable = document.getElementById("results-table");

// Load results from local storage
const results = JSON.parse(localStorage.getItem("results")) || [];

// Render existing results in table
results.forEach((result) => {
    const row = resultsTable.insertRow();
    row.innerHTML = `<td>${result.date}</td><td>${result.importations}</td><td>${result.money}</td><td>${result.position}</td><td>${result.bonus.toFixed(
        2
    )} \u20AC</td>`;
});

// Clear history button
const clearHistoryBtn = document.getElementById("clear-history-btn");
clearHistoryBtn.addEventListener("click", () => {
    localStorage.removeItem("results");
    resultsTable.innerHTML = "";
});

function calculateBonus() {
    const importations = document.getElementById("importations").value;
    const money = document.getElementById("money").value;
    const position = document.getElementById("position").value;

    let bonus = 0;
    let gif = "";

    // Calculate bonus based on position and performance
    // if (position === "teamLead") {
    //     if (importations >= 10 && money >= 350) {
    //         bonus = (importations * 5) + (money * 0.1);
    //         // bonus =  ((importations-10) * 5) + ((money - 500) * 0.1);
    //     }
    // } else {
    //     if (importations >= 10 && money >= 500) {
    //         bonus = ((importations - 10) * 10) + ((money - 500) * 0.2);
    //         // bonus = (importations * 5) + (money * 0.1); Same as excel formula
    //         // bonus = 50 + ((importations - 10) / 10) * 2 + (money - 10000) * 0.01 * 3;
    //     }
    // }

    if (importations >= 10 && money >= 500) {
        bonus = ((importations - 10) * 10) + ((money - 500) * 0.2);
    }

    // Determine GIF based on bonus amount
    if (bonus >= 300) {
        gif = "https://media.giphy.com/media/i3D35lrOfyzTkg5a9o/giphy.gif";
    } else if (bonus >= 200) {
        gif = "https://media.giphy.com/media/JpG2A9P3dPHXaTYrwu/giphy.gif";
    } else if (bonus >= 100) {
        gif = "https://media.giphy.com/media/xTiTnqUxyWbsAXq7Ju/giphy.gif";
    } else if (bonus == 0) {
        gif = "https://media.giphy.com/media/ckGndVa23sCk9pae4l/giphy.gif";
    } else {
        gif = "https://media.giphy.com/media/3oz8xAFtqoOUUrsh7W/giphy.gif";
    }

    // Display bonus
    const bonusElement = document.getElementById("bonus");
    if (bonus > 0) {
        bonusElement.innerHTML = `<strong>Your bonus is \u20AC${bonus.toFixed(
            2
        )}</strong>`;
    } else {
        bonusElement.textContent =
            "Sorry, you don't qualify for a bonus this month.";
    }

    // Display the GIF
    const gifElement = document.getElementById("gif");
    gifElement.src = gif;
    gifElement.style.display = "block";

    // Remove the GIF after 3 seconds
    setTimeout(() => {
        gifElement.style.display = "none";
    }, 3000);

    // Save results to local storage
    const date = new Date().toLocaleDateString();
    const result = { date, importations, money, position, bonus };
    results.unshift(result);
    localStorage.setItem("results", JSON.stringify(results));

    // Add result to table
    const row = resultsTable.insertRow(0);
    row.innerHTML = `<td>${date}</td><td>${importations}</td><td>${money}</td><td>${position}</td><td>${bonus.toFixed(
        2
    )} \u20AC</td>`;
}

const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    calculateBonus();
});

