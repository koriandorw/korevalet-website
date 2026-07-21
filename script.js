const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");

if (menuButton && navLinks) {
  menuButton.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

const unitRange = document.getElementById("unitRange");
const unitValue = document.getElementById("unitValue");
const residentFee = document.getElementById("residentFee");
const serviceCost = document.getElementById("serviceCost");
const monthlyRevenue = document.getElementById("monthlyRevenue");
const monthlyCost = document.getElementById("monthlyCost");
const monthlyProfit = document.getElementById("monthlyProfit");
const annualProfit = document.getElementById("annualProfit");
const roiPercent = document.getElementById("roiPercent");

function formatMoney(value) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  });
}

function calculateROI() {
  if (!unitRange) {
    return;
  }

  const units = Number(unitRange.value) || 0;
  const fee = Number(residentFee.value) || 0;
  const costPerUnit = Number(serviceCost.value) || 0;

  const revenue = units * fee;
  const serviceTotal = units * costPerUnit;
  const profit = revenue - serviceTotal;
  const annual = profit * 12;
  const roi = revenue > 0 ? (profit / revenue) * 100 : 0;

  unitValue.textContent = units;
  monthlyRevenue.textContent = formatMoney(revenue);
  monthlyCost.textContent = formatMoney(serviceTotal);
  monthlyProfit.textContent = formatMoney(profit);
  annualProfit.textContent = formatMoney(annual);
  roiPercent.textContent = `${Math.round(roi)}%`;
}

if (unitRange) {
  unitRange.addEventListener("input", calculateROI);
  residentFee.addEventListener("input", calculateROI);
  serviceCost.addEventListener("input", calculateROI);
  calculateROI();
}
