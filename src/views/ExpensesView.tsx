import React, { useState } from 'react';
import { 
  Receipt, 
  Plus, 
  FileText, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Upload, 
  DollarSign, 
  Car, 
  Ticket, 
  Wrench, 
  Shirt, 
  ShieldCheck, 
  HelpCircle,
  X
} from 'lucide-react';
import { useVolunteer } from '../context/VolunteerContext';
import { ExpenseClaim } from '../types';

export const ExpensesView: React.FC = () => {
  const { expenses, submitExpenseClaim, showToast } = useVolunteer();
  const [activeTab, setActiveTab] = useState<'claims' | 'support-programs'>('claims');
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  // Form State
  const [category, setCategory] = useState<ExpenseClaim['category']>('Паливо');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState<ExpenseClaim['currency']>('GBP');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [desc, setDesc] = useState('');
  const [receiptFileName, setReceiptFileName] = useState('receipt_photo.pdf');

  const handleClaimSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || isNaN(Number(amount))) {
      showToast('Введіть дійсну суму витрат.');
      return;
    }
    if (!desc.trim()) {
      showToast('Опишіть призначення витрати.');
      return;
    }

    submitExpenseClaim({
      category,
      amount: parseFloat(amount),
      currency,
      date,
      description: desc.trim(),
      receiptName: receiptFileName
    });

    setAmount('');
    setDesc('');
    setIsSubmitModalOpen(false);
  };

  const getStatusBadge = (status: ExpenseClaim['status']) => {
    switch (status) {
      case 'Погоджено':
        return (
          <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 text-[11px] font-bold rounded-lg border border-emerald-200 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Погоджено
          </span>
        );
      case 'На розгляді':
        return (
          <span className="px-2.5 py-1 bg-amber-50 text-amber-800 text-[11px] font-bold rounded-lg border border-amber-200 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            На розгляді
          </span>
        );
      case 'Відхилено':
        return (
          <span className="px-2.5 py-1 bg-rose-50 text-rose-800 text-[11px] font-bold rounded-lg border border-rose-200 flex items-center gap-1">
            <XCircle className="w-3.5 h-3.5 text-rose-600" />
            Відхилено
          </span>
        );
    }
  };

  const formatCurrency = (val: number, cur: string) => {
    const symbol = cur === 'GBP' ? '£' : cur === 'EUR' ? '€' : '₴';
    return `${symbol}${val.toFixed(2)}`;
  };

  const approvedTotal = expenses
    .filter(e => e.status === 'Погоджено')
    .reduce((sum, e) => sum + e.amount, 0);

  const pendingTotal = expenses
    .filter(e => e.status === 'На розгляді')
    .reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-sky-900 rounded-2xl p-6 text-white shadow-lg border border-blue-700/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase font-extrabold text-amber-300 tracking-wider">
              ПРОЗОРІСТЬ ТА МАТЕРІАЛЬНА ПІДТРИМКА
            </span>
            <h1 className="text-2xl sm:text-3xl font-black font-heading mt-1">
              Мої витрати та компенсації
            </h1>
            <p className="text-xs sm:text-sm text-blue-200 mt-1 max-w-2xl">
              Фонд відшкодовує волонтерам витрати на пальне, проїзд, квитки та захисне спорядження, підтверджені фіскальними чеками.
            </p>
          </div>

          <button
            onClick={() => setIsSubmitModalOpen(true)}
            className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-blue-950 font-bold rounded-xl text-xs shadow-md shadow-amber-400/20 transition-all cursor-pointer flex items-center gap-2 self-start md:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>+ Подати витрату</span>
          </button>
        </div>
      </div>

      {/* 2. Stat Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">Погоджено до виплати</span>
          <p className="text-2xl font-black font-mono text-emerald-600 mt-1 tabular-nums">
            £{approvedTotal.toFixed(2)}
          </p>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Затверджено бухгалтерією</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">Зараз на розгляді</span>
          <p className="text-2xl font-black font-mono text-amber-600 mt-1 tabular-nums">
            £{pendingTotal.toFixed(2)}
          </p>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Очікує фінансової верифікації</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">Загальна кількість заявок</span>
          <p className="text-2xl font-black font-mono text-blue-900 mt-1 tabular-nums">
            {expenses.length}
          </p>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Усі задокументовані випадки</span>
        </div>
      </div>

      {/* 3. Sub-tabs */}
      <div className="flex border-b border-slate-200 bg-white p-1 rounded-2xl border shadow-xs gap-1">
        <button
          onClick={() => setActiveTab('claims')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'claims'
              ? 'bg-blue-700 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Журнал моїх витрат ({expenses.length})
        </button>
        <button
          onClick={() => setActiveTab('support-programs')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'support-programs'
              ? 'bg-blue-700 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          🎒 Програми допомоги волонтеру від Thymus
        </button>
      </div>

      {/* 4. TAB 1: CLAIMS TABLE */}
      {activeTab === 'claims' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900">Історія поданих витрат</h3>
            <span className="text-xs text-slate-500">Виплати відбуваються щоп'ятниці</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-4">Категорія</th>
                  <th className="py-3 px-4">Опис витрати</th>
                  <th className="py-3 px-4">Дата</th>
                  <th className="py-3 px-4">Чек / Документ</th>
                  <th className="py-3 px-4 text-right">Сума</th>
                  <th className="py-3 px-4 text-center">Статус</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {expenses.map(exp => (
                  <tr key={exp.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-semibold text-slate-900 whitespace-nowrap">
                      {exp.category}
                    </td>
                    <td className="py-3 px-4 text-slate-600 max-w-xs truncate">
                      {exp.description}
                    </td>
                    <td className="py-3 px-4 text-slate-500 font-mono whitespace-nowrap">
                      {exp.date}
                    </td>
                    <td className="py-3 px-4 text-blue-700 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 hover:underline cursor-pointer">
                        <FileText className="w-3.5 h-3.5 text-slate-400" />
                        {exp.receiptName}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-slate-900 tabular-nums whitespace-nowrap">
                      {formatCurrency(exp.amount, exp.currency)}
                    </td>
                    <td className="py-3 px-4 text-center whitespace-nowrap">
                      <div className="flex justify-center">
                        {getStatusBadge(exp.status)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. TAB 2: SUPPORT PROGRAMS FOR VOLUNTEER */}
      {activeTab === 'support-programs' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              title: 'Професійний спецодяг та взуття',
              desc: 'Теплі брендовані жилетки, захисні куртки та водонепроникне взуття для виїздів.',
              icon: '👕',
              tag: 'Спорядження'
            },
            {
              title: 'Медичний Check-up здоров\'я',
              desc: 'Щорічний комплексний медичний огляд для волонтерів активного корпусу у клініках-партнерах.',
              icon: '🩺',
              tag: 'Здоров\'я'
            },
            {
              title: 'Компенсація палива та проїзду',
              desc: '100% покриття витрат на дорогу під час виконання волонтерських завдань за чеками.',
              icon: '🚗',
              tag: 'Транспорт'
            },
            {
              title: 'Гранти на профільне навчання',
              desc: 'Оплата курсів першої допомоги, іноземних мов та сертифікацій для координаторів.',
              icon: '🎓',
              tag: 'Освіта'
            },
            {
              title: 'Участь у міжнародних конференціях',
              desc: 'Покриття витрат на участь у щорічних благодійних форумах у Лондоні, Брюсселі та Києві.',
              icon: '🎟️',
              tag: 'Нетворкінг'
            }
          ].map((prog, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{prog.icon}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-blue-50 text-blue-800 rounded">
                    {prog.tag}
                  </span>
                </div>
                <h4 className="font-bold text-sm text-slate-900 mt-3 font-heading">
                  {prog.title}
                </h4>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  {prog.desc}
                </p>
              </div>

              <button
                onClick={() => showToast(`Заявку на участь у програмі "${prog.title}" надіслано до координатора!`)}
                className="mt-5 w-full py-2 bg-blue-50 hover:bg-blue-100 text-blue-900 font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                Подати запит на підтримку
              </button>
            </div>
          ))}
        </div>
      )}

      {/* SUBMIT CLAIM MODAL */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-sm text-slate-900">
                Подати витрату на компенсацію (Expense Claim)
              </h3>
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleClaimSubmit} className="space-y-4 mt-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Категорія</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value as any)}
                    className="w-full p-2.5 border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="Паливо">🚗 Паливо / бензин</option>
                    <option value="Квиток">🎫 Квиток (поїзд/автобус)</option>
                    <option value="Транспорт">🚌 Інший транспорт</option>
                    <option value="Обладнання">🛠 Обладнання / інструмент</option>
                    <option value="Спецодяг">👕 Спецодяг та захист</option>
                    <option value="Інше">📦 Інше</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Валюта</label>
                  <select
                    value={currency}
                    onChange={e => setCurrency(e.target.value as any)}
                    className="w-full p-2.5 border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="GBP">GBP (£ - Фунт стерлінгів)</option>
                    <option value="UAH">UAH (₴ - Гривня)</option>
                    <option value="EUR">EUR (€ - Євро)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Сума витрат</label>
                  <input
                    type="number"
                    step="0.01"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    placeholder="Наприклад: 24.50"
                    className="w-full p-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Дата платежу</label>
                  <input
                    type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Призначення платежу (для якого проєкту або місії)
                </label>
                <textarea
                  value={desc}
                  onChange={e => setDesc(e.target.value)}
                  rows={3}
                  placeholder="Вкажіть назву проєкту, маршрут поїздки або придбані речі..."
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>

              {/* Receipt File upload simulator */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Фото або PDF квитанції / чека
                </label>
                <div className="p-3 border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-between bg-slate-50">
                  <div className="flex items-center gap-2">
                    <Upload className="w-4 h-4 text-blue-700" />
                    <span className="font-mono text-slate-700 truncate max-w-[200px]">
                      {receiptFileName}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setReceiptFileName(`receipt_${Date.now().toString().slice(-4)}.jpg`);
                      showToast('Новий чек прикріплено!');
                    }}
                    className="text-xs text-blue-700 font-bold hover:underline"
                  >
                    Завантажити фото
                  </button>
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="flex-1 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl"
                >
                  Скасувати
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl shadow-sm"
                >
                  Відправити до бухгалтерії
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
