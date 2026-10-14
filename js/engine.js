const FinancialEngine = {
    getActiveCycle(targetDate = new Date()) {
        let year = targetDate.getFullYear();
        let month = targetDate.getMonth();
        let day = targetDate.getDate();

        let startYear = year, startMonth = month, endYear = year, endMonth = month;

        if (day >= 21) {
            startMonth = month;
            endMonth = month + 1;
            if (endMonth > 11) { endMonth = 0; endYear += 1; }
        } else {
            startMonth = month - 1;
            endMonth = month;
            if (startMonth < 0) { startMonth = 11; startYear -= 1; }
        }

        const fmt = (y, m, d) => `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
        return {
            cycle_id: `${startYear}-${String(startMonth + 1).padStart(2, '0')}`,
            startDate: fmt(startYear, startMonth, 21),
            endDate: fmt(endYear, endMonth, 20)
        };
    },

    calculateTHP({ baseSalary, workDays, unpaidDays, extraFunds, overtimeNormal }) {
        const uangMakan = workDays * 12000;
        let overtimePay = unpaidDays > 0 ? 0 : overtimeNormal;

        const bpjs = baseSalary * 0.01;
        const jht = baseSalary * 0.02;
        const pensiun = baseSalary * 0.01;

        const dailyRate = baseSalary / 22;
        const unpaidDeduction = unpaidDays * dailyRate;

        const totalIncome = baseSalary + uangMakan + extraFunds + overtimePay;
        const totalDeductions = bpjs + jht + pensiun + unpaidDeduction;
        const thp = totalIncome - totalDeductions;

        return {
            uangMakan,
            overtimePay,
            unpaidDeduction,
            totalDeductions,
            thp
        };
    },

    processTransfer(nominal, bankDestination) {
        let adminFee = (bankDestination === 'MANDIRI') ? 2500 : 0;
        return {
            nominal,
            adminFee,
            totalDeducted: nominal + adminFee
        };
    }
};
