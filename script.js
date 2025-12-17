// ==================== Data Management ====================
class ReceiptManager {
    constructor() {
        this.receipts = this.loadReceipts();
        this.currentEditId = null;
    }

    // Load receipts from LocalStorage
    loadReceipts() {
        const stored = localStorage.getItem('cashReceipts');
        return stored ? JSON.parse(stored) : [];
    }

    // Save receipts to LocalStorage
    saveReceipts() {
        localStorage.setItem('cashReceipts', JSON.stringify(this.receipts));
    }

    // Generate receipt number
    generateReceiptNumber() {
        const year = new Date().getFullYear();
        const count = this.receipts.length + 1;
        return `KK-${year}-${String(count).padStart(4, '0')}`;
    }

    // Add new receipt
    addReceipt(receipt) {
        const newReceipt = {
            id: Date.now().toString(),
            receiptNumber: this.generateReceiptNumber(),
            ...receipt,
            createdAt: new Date().toISOString()
        };
        this.receipts.push(newReceipt);
        this.saveReceipts();
        return newReceipt;
    }

    // Update existing receipt
    updateReceipt(id, updatedData) {
        const index = this.receipts.findIndex(receipt => receipt.id === id);
        if (index !== -1) {
            this.receipts[index] = {
                ...this.receipts[index],
                ...updatedData,
                updatedAt: new Date().toISOString()
            };
            this.saveReceipts();
            return this.receipts[index];
        }
        return null;
    }

    // Delete receipt
    deleteReceipt(id) {
        const index = this.receipts.findIndex(receipt => receipt.id === id);
        if (index !== -1) {
            this.receipts.splice(index, 1);
            this.saveReceipts();
            return true;
        }
        return false;
    }

    // Get receipt by ID
    getReceipt(id) {
        return this.receipts.find(receipt => receipt.id === id);
    }

    // Get all receipts
    getAllReceipts() {
        return this.receipts;
    }

    // Calculate total amount
    calculateTotal() {
        return this.receipts.reduce((total, receipt) => {
            return total + parseFloat(receipt.amount);
        }, 0);
    }

    // Calculate today's total
    calculateTodayTotal() {
        const today = new Date().toISOString().split('T')[0];
        return this.receipts
            .filter(receipt => receipt.date === today)
            .reduce((total, receipt) => total + parseFloat(receipt.amount), 0);
    }

    // Calculate month's total
    calculateMonthTotal() {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();
        
        return this.receipts
            .filter(receipt => {
                const receiptDate = new Date(receipt.date);
                return receiptDate.getFullYear() === year && receiptDate.getMonth() === month;
            })
            .reduce((total, receipt) => total + parseFloat(receipt.amount), 0);
    }
}

// ==================== UI Management ====================
class UIManager {
    constructor(receiptManager) {
        this.receiptManager = receiptManager;
        this.initializeElements();
        this.attachEventListeners();
        this.renderReceipts();
        this.updateStatistics();
    }

    initializeElements() {
        // Form elements
        this.receiptForm = document.getElementById('receiptForm');
        this.receiptNumberInput = document.getElementById('receiptNumber');
        this.payerNameInput = document.getElementById('payerName');
        this.payerPhoneInput = document.getElementById('payerPhone');
        this.amountInput = document.getElementById('amount');
        this.dateInput = document.getElementById('date');
        this.purposeInput = document.getElementById('purpose');
        this.notesInput = document.getElementById('notes');

        // Statistics elements
        this.todayTotalDisplay = document.getElementById('todayTotal');
        this.monthTotalDisplay = document.getElementById('monthTotal');
        this.totalAmountDisplay = document.getElementById('totalAmount');
        this.orderCountDisplay = document.getElementById('orderCount');

        // Table elements
        this.receiptsTableBody = document.getElementById('receiptsTableBody');

        // Modal elements
        this.editModal = document.getElementById('editModal');
        this.editForm = document.getElementById('editForm');
        this.closeModalBtn = document.getElementById('closeModal');
        this.cancelEditBtn = document.getElementById('cancelEdit');
        
        this.editIdInput = document.getElementById('editId');
        this.editReceiptNumberInput = document.getElementById('editReceiptNumber');
        this.editPayerNameInput = document.getElementById('editPayerName');
        this.editPayerPhoneInput = document.getElementById('editPayerPhone');
        this.editAmountInput = document.getElementById('editAmount');
        this.editDateInput = document.getElementById('editDate');
        this.editPurposeInput = document.getElementById('editPurpose');
        this.editNotesInput = document.getElementById('editNotes');

        // Print modal elements
        this.printModal = document.getElementById('printModal');
        this.closePrintModalBtn = document.getElementById('closePrintModal');
        this.cancelPrintBtn = document.getElementById('cancelPrint');
        this.printBtn = document.getElementById('printBtn');
        this.printContent = document.getElementById('printContent');

        // Set today's date as default
        const today = new Date().toISOString().split('T')[0];
        this.dateInput.value = today;

        // Set next receipt number
        this.receiptNumberInput.value = this.receiptManager.generateReceiptNumber();
    }

    attachEventListeners() {
        // Form submission
        this.receiptForm.addEventListener('submit', (e) => this.handleAddReceipt(e));

        // Edit form submission
        this.editForm.addEventListener('submit', (e) => this.handleEditReceipt(e));

        // Modal controls
        this.closeModalBtn.addEventListener('click', () => this.closeEditModal());
        this.cancelEditBtn.addEventListener('click', () => this.closeEditModal());

        // Print modal controls
        this.closePrintModalBtn.addEventListener('click', () => this.closePrintModal());
        this.cancelPrintBtn.addEventListener('click', () => this.closePrintModal());
        this.printBtn.addEventListener('click', () => this.handlePrint());

        // Close modals on outside click
        this.editModal.addEventListener('click', (e) => {
            if (e.target === this.editModal) {
                this.closeEditModal();
            }
        });

        this.printModal.addEventListener('click', (e) => {
            if (e.target === this.printModal) {
                this.closePrintModal();
            }
        });

        // Close modals on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (this.editModal.classList.contains('active')) {
                    this.closeEditModal();
                }
                if (this.printModal.classList.contains('active')) {
                    this.closePrintModal();
                }
            }
        });
    }

    handleAddReceipt(e) {
        e.preventDefault();

        const receiptData = {
            payerName: this.payerNameInput.value.trim(),
            payerPhone: this.payerPhoneInput.value.trim(),
            amount: parseFloat(this.amountInput.value),
            date: this.dateInput.value,
            purpose: this.purposeInput.value.trim(),
            notes: this.notesInput.value.trim()
        };

        this.receiptManager.addReceipt(receiptData);
        this.renderReceipts();
        this.updateStatistics();
        this.receiptForm.reset();
        
        // Reset date to today and update receipt number
        const today = new Date().toISOString().split('T')[0];
        this.dateInput.value = today;
        this.receiptNumberInput.value = this.receiptManager.generateReceiptNumber();

        this.showNotification('Kirim muvaffaqiyatli qabul qilindi!', 'success');
    }

    handleEditReceipt(e) {
        e.preventDefault();

        const id = this.editIdInput.value;
        const updatedData = {
            payerName: this.editPayerNameInput.value.trim(),
            payerPhone: this.editPayerPhoneInput.value.trim(),
            amount: parseFloat(this.editAmountInput.value),
            date: this.editDateInput.value,
            purpose: this.editPurposeInput.value.trim(),
            notes: this.editNotesInput.value.trim()
        };

        this.receiptManager.updateReceipt(id, updatedData);
        this.renderReceipts();
        this.updateStatistics();
        this.closeEditModal();
        this.showNotification('Kirim muvaffaqiyatli yangilandi!', 'success');
    }

    openEditModal(id) {
        const receipt = this.receiptManager.getReceipt(id);
        if (receipt) {
            this.editIdInput.value = receipt.id;
            this.editReceiptNumberInput.value = receipt.receiptNumber;
            this.editPayerNameInput.value = receipt.payerName;
            this.editPayerPhoneInput.value = receipt.payerPhone || '';
            this.editAmountInput.value = receipt.amount;
            this.editDateInput.value = receipt.date;
            this.editPurposeInput.value = receipt.purpose;
            this.editNotesInput.value = receipt.notes || '';
            this.editModal.classList.add('active');
        }
    }

    closeEditModal() {
        this.editModal.classList.remove('active');
        this.editForm.reset();
    }

    handleDeleteReceipt(id) {
        if (confirm('Ushbu kirim orderini o\'chirmoqchimisiz?')) {
            this.receiptManager.deleteReceipt(id);
            this.renderReceipts();
            this.updateStatistics();
            this.showNotification('Kirim o\'chirildi', 'info');
        }
    }

    openPrintModal(id) {
        const receipt = this.receiptManager.getReceipt(id);
        if (receipt) {
            this.printContent.innerHTML = this.generatePrintContent(receipt);
            this.printModal.classList.add('active');
        }
    }

    closePrintModal() {
        this.printModal.classList.remove('active');
    }

    handlePrint() {
        window.print();
    }

    generatePrintContent(receipt) {
        const date = new Date(receipt.date);
        const formattedDate = new Intl.DateTimeFormat('uz-UZ', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(date);

        return `
            <div class="print-header">
                <h3>NAQD PUL KIRIM QABULI</h3>
                <p>Qabul №: ${receipt.receiptNumber}</p>
            </div>
            <div class="print-body">
                <div class="print-row">
                    <span class="print-label">To'lovchi:</span>
                    <span>${this.escapeHtml(receipt.payerName)}</span>
                </div>
                ${receipt.payerPhone ? `
                <div class="print-row">
                    <span class="print-label">Telefon:</span>
                    <span>${this.escapeHtml(receipt.payerPhone)}</span>
                </div>
                ` : ''}
                <div class="print-row">
                    <span class="print-label">Summa:</span>
                    <span>${this.formatCurrency(receipt.amount)}</span>
                </div>
                <div class="print-row">
                    <span class="print-label">To'lov maqsadi:</span>
                    <span>${this.escapeHtml(receipt.purpose)}</span>
                </div>
                <div class="print-row">
                    <span class="print-label">Sana:</span>
                    <span>${formattedDate}</span>
                </div>
                ${receipt.notes ? `
                <div class="print-row">
                    <span class="print-label">Izoh:</span>
                    <span>${this.escapeHtml(receipt.notes)}</span>
                </div>
                ` : ''}
            </div>
            <div class="print-footer">
                <p>Rahmat!</p>
                <p style="margin-top: 20px;">_________________</p>
                <p>Kassir imzosi</p>
            </div>
        `;
    }

    renderReceipts() {
        const receipts = this.receiptManager.getAllReceipts();
        
        if (receipts.length === 0) {
            this.receiptsTableBody.innerHTML = `
                <tr class="empty-state">
                    <td colspan="7">
                        <div class="empty-message">
                            <span class="empty-icon">📋</span>
                            <p>Hozircha kirim orderlar yo'q</p>
                            <p class="empty-hint">Yuqoridagi formadan yangi kirim qo'shing</p>
                        </div>
                    </td>
                </tr>
            `;
        } else {
            this.receiptsTableBody.innerHTML = receipts.map((receipt) => {
                return `
                    <tr>
                        <td><strong>${this.escapeHtml(receipt.receiptNumber)}</strong></td>
                        <td>${this.escapeHtml(receipt.payerName)}</td>
                        <td>${receipt.payerPhone ? this.escapeHtml(receipt.payerPhone) : '-'}</td>
                        <td><strong>${this.formatCurrency(receipt.amount)}</strong></td>
                        <td>${this.escapeHtml(receipt.purpose)}</td>
                        <td>${this.formatDate(receipt.date)}</td>
                        <td>
                            <button class="btn btn-print" onclick="ui.openPrintModal('${receipt.id}')" title="Chop etish">
                                🖨️
                            </button>
                            <button class="btn btn-edit" onclick="ui.openEditModal('${receipt.id}')" title="Tahrirlash">
                                ✏️
                            </button>
                            <button class="btn btn-delete" onclick="ui.handleDeleteReceipt('${receipt.id}')" title="O'chirish">
                                🗑️
                            </button>
                        </td>
                    </tr>
                `;
            }).join('');
        }
    }

    updateStatistics() {
        const todayTotal = this.receiptManager.calculateTodayTotal();
        const monthTotal = this.receiptManager.calculateMonthTotal();
        const total = this.receiptManager.calculateTotal();
        const count = this.receiptManager.getAllReceipts().length;

        this.todayTotalDisplay.textContent = this.formatCurrency(todayTotal);
        this.monthTotalDisplay.textContent = this.formatCurrency(monthTotal);
        this.totalAmountDisplay.textContent = this.formatCurrency(total);
        this.orderCountDisplay.textContent = count;
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('uz-UZ', {
            style: 'decimal',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        }).format(amount) + ' so\'m';
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('uz-UZ', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }).format(date);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
            color: #0a1f0f;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            font-weight: 600;
            z-index: 10000;
            animation: slideInRight 0.4s ease;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.4s ease';
            setTimeout(() => notification.remove(), 400);
        }, 3000);
    }
}

// ==================== Initialize Application ====================
let receiptManager;
let ui;

document.addEventListener('DOMContentLoaded', () => {
    receiptManager = new ReceiptManager();
    ui = new UIManager(receiptManager);
    
    console.log('Naqd Pul Kirim Order Tizimi ishga tushdi!');
    console.log(`Jami ${receiptManager.getAllReceipts().length} ta kirim yuklandi`);
});

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(style);
