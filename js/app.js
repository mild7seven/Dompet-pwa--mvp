document.addEventListener('DOMContentLoaded', () => {
    const cycle = FinancialEngine.getActiveCycle();
    document.getElementById('active-cycle-badge').innerText = `Siklus: ${cycle.startDate} s.d. ${cycle.endDate}`;

    document.getElementById('calc-btn').addEventListener('click', async () => {
        const baseSalary = 5161769;
        const extraFunds = parseFloat(document.getElementById('extra-funds').value) || 0;
        const workDays = parseInt(document.getElementById('work-days').value) || 0;
        const unpaidDays = parseInt(document.getElementById('unpaid-leave-days').value) || 0;

        const result = FinancialEngine.calculateTHP({
            baseSalary,
            workDays,
            unpaidDays,
            extraFunds,
            overtimeNormal: 250000
        });

        document.getElementById('summary-thp').innerText = `Rp ${Math.round(result.thp).toLocaleString('id-ID')}`;
        
        // Simpan ke IndexedDB
        try {
            await saveTransaction({
                cycle_id: cycle.cycle_id,
                date: new Date().toISOString(),
                type: 'SALARY_CALCULATION',
                data: result
            });
            console.log('Data kalkulasi berhasil disimpan ke IndexedDB');
        } catch (err) {
            console.error('Gagal menyimpan ke IndexedDB:', err);
        }
    });

    document.getElementById('transfer-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const bank = document.getElementById('bank-dest').value;
        const nominal = parseFloat(document.getElementById('transfer-nominal').value) || 0;
        
        const transferResult = FinancialEngine.processTransfer(nominal, bank);
        const resBox = document.getElementById('transfer-result');
        resBox.classList.remove('hidden');
        resBox.innerHTML = `Transfer ke <b>${bank}</b>: Rp ${nominal.toLocaleString('id-ID')} | Admin: Rp ${transferResult.adminFee.toLocaleString('id-ID')} | Total: <b>Rp ${transferResult.totalDeducted.toLocaleString('id-ID')}</b>`;
    });

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js');
    }
});
