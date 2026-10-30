import React, { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  Smile, 
  Users, 
  Megaphone, 
  Calendar, 
  Pin, 
  CheckCircle2, 
  Sparkles,
  Paperclip,
  Share2
} from 'lucide-react';
import { useVolunteer } from '../context/VolunteerContext';

export const CommunityChatView: React.FC = () => {
  const { 
    channels, 
    messages, 
    sendMessage, 
    addReaction, 
    announcements, 
    registerForAnnouncement,
    showToast 
  } = useVolunteer();

  const [activeTab, setActiveTab] = useState<'chat' | 'announcements' | 'events'>('chat');
  const [selectedChannelId, setSelectedChannelId] = useState<string>('ch-general');
  const [inputText, setInputText] = useState('');

  const currentChannel = channels.find(c => c.id === selectedChannelId) || channels[0];
  const currentMessages = messages[selectedChannelId] || [];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(selectedChannelId, inputText);
    setInputText('');
  };

  const handleReactionClick = (msgId: string, emoji: string) => {
    addReaction(selectedChannelId, msgId, emoji);
  };

  const upcomingEventsList = [
    {
      id: 'e1',
      title: 'Великий волонтерський саміт Thymus South Wales',
      date: 'Субота, 12 жовтня 2024, 11:00',
      location: 'Cardiff City Hall',
      category: 'Очний збір',
      desc: 'Підбиття підсумків кварталу, вручення нагород, нетворкінг та святковий ланч.'
    },
    {
      id: 'e2',
      title: 'Воркшоп: Робота з дітьми у кризових станах',
      date: 'Вівторок, 15 жовтня 2024, 18:30',
      location: 'Онлайн (Zoom)',
      category: 'Освітній тренінг',
      desc: 'Спеціальний семінар дитячого психолога для волонтерів освітнього напрямку.'
    }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-sky-900 rounded-2xl p-6 text-white shadow-lg border border-blue-700/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase font-extrabold text-amber-300 tracking-wider">
              ЄДИНА СПІЛЬНОТА ВОЛОНТЕРІВ
            </span>
            <h1 className="text-2xl sm:text-3xl font-black font-heading mt-1">
              Спільнота The Thymus Foundation
            </h1>
            <p className="text-xs sm:text-sm text-blue-200 mt-1 max-w-2xl">
              Координація проєктів, офіційні оголошення фонду, тематичні обговорення та підтримка однодумців.
            </p>
          </div>

          <div className="flex items-center gap-1 p-1 bg-white/10 rounded-xl backdrop-blur-xs border border-white/20 self-start md:self-auto">
            <button
              onClick={() => setActiveTab('chat')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'chat'
                  ? 'bg-amber-400 text-blue-950 shadow-sm'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              Чати
            </button>
            <button
              onClick={() => setActiveTab('announcements')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'announcements'
                  ? 'bg-amber-400 text-blue-950 shadow-sm'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              Оголошення
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'events'
                  ? 'bg-amber-400 text-blue-950 shadow-sm'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              Події
            </button>
          </div>
        </div>
      </div>

      {/* 2. TAB 1: CHATS INTERFACE */}
      {activeTab === 'chat' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-3 h-[680px]">
          
          {/* Channels Sidebar */}
          <div className="lg:col-span-1 border-r border-slate-200 flex flex-col h-full bg-slate-50/50">
            <div className="p-4 border-b border-slate-200 bg-white">
              <h3 className="font-bold text-sm text-slate-900">Канали спілкування</h3>
              <p className="text-[11px] text-slate-500">1,284 активних волонтерів на зв'язку</p>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-slate-100 p-2 space-y-1">
              {channels.map(channel => {
                const isSelected = selectedChannelId === channel.id;
                return (
                  <button
                    key={channel.id}
                    onClick={() => setSelectedChannelId(channel.id)}
                    className={`w-full p-3 rounded-xl text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-700 text-white shadow-sm'
                        : 'bg-white hover:bg-slate-100 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs truncate max-w-[190px]">
                        {channel.name}
                      </span>
                      <span className={`text-[10px] font-mono ${isSelected ? 'text-blue-200' : 'text-slate-400'}`}>
                        {channel.lastMessageTime}
                      </span>
                    </div>

                    <p className={`text-[11px] truncate mt-1 ${isSelected ? 'text-blue-100' : 'text-slate-500'}`}>
                      {channel.lastMessage || channel.description}
                    </p>

                    <div className="flex items-center gap-2 mt-2 text-[10px]">
                      <span className={`flex items-center gap-1 ${isSelected ? 'text-blue-200' : 'text-slate-400'}`}>
                        <Users className="w-3 h-3" />
                        {channel.membersCount}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Chat Messages Feed & Input */}
          <div className="lg:col-span-2 flex flex-col h-full bg-white">
            
            {/* Active Channel Header */}
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-white">
              <div>
                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <span>{currentChannel.name}</span>
                </h3>
                <p className="text-[11px] text-slate-500">{currentChannel.description}</p>
              </div>
              <span className="text-xs px-2.5 py-1 bg-blue-50 text-blue-800 font-bold rounded-lg border border-blue-200">
                {currentChannel.membersCount} учасників
              </span>
            </div>

            {/* Pinned announcement banner */}
            <div className="bg-amber-50/80 px-4 py-2 border-b border-amber-200 flex items-center gap-2 text-xs text-amber-900">
              <Pin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span className="truncate">
                Закріплено: Зустріч волонтерів суботньої зміни у Кардіффі о 09:45 біля головного входу.
              </span>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/40">
              {currentMessages.map(msg => (
                <div key={msg.id} className="flex items-start gap-3 group">
                  <img
                    src={msg.senderAvatar}
                    alt={msg.senderName}
                    className="w-9 h-9 rounded-full object-cover border border-slate-200 shrink-0 mt-0.5"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{msg.senderName}</span>
                      {msg.isCoordinator && (
                        <span className="px-1.5 py-0.2 bg-blue-100 text-blue-800 text-[10px] font-bold rounded">
                          Координатор
                        </span>
                      )}
                      <span className="text-[10px] text-slate-400 font-mono">{msg.timestamp}</span>
                    </div>

                    <div className="mt-1 p-3 rounded-2xl bg-white border border-slate-200/90 text-xs text-slate-800 leading-relaxed shadow-xs inline-block max-w-[90%]">
                      {msg.content}
                    </div>

                    {/* Reactions */}
                    <div className="flex flex-wrap items-center gap-1 mt-1.5">
                      {msg.reactions.map((r, rIdx) => (
                        <button
                          key={rIdx}
                          onClick={() => handleReactionClick(msg.id, r.emoji)}
                          className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 rounded-full text-[11px] font-bold text-slate-700 flex items-center gap-1 border border-slate-200 transition-colors"
                        >
                          <span>{r.emoji}</span>
                          <span className="font-mono text-[10px]">{r.count}</span>
                        </button>
                      ))}

                      {/* Quick reaction trigger */}
                      <button
                        onClick={() => handleReactionClick(msg.id, '❤️')}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-rose-500 px-1 text-xs"
                        title="Додати ❤️"
                      >
                        ❤️
                      </button>
                      <button
                        onClick={() => handleReactionClick(msg.id, '👍')}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-blue-500 px-1 text-xs"
                        title="Додати 👍"
                      >
                        👍
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input Box */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-200 bg-white flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                placeholder={`Написати повідомлення у #${currentChannel.name}...`}
                className="flex-1 text-xs px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-slate-50 focus:bg-white"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Надіслати</span>
              </button>
            </form>

          </div>

        </div>
      )}

      {/* 3. TAB 2: ANNOUNCEMENTS */}
      {activeTab === 'announcements' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {announcements.map(ann => (
              <div
                key={ann.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-blue-50 text-blue-800 rounded-md">
                      {ann.category}
                    </span>
                    <span className="text-[11px] text-slate-400">{ann.publishedAt}</span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 mt-3 font-heading leading-snug">
                    {ann.title}
                  </h3>
                  
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {ann.content}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span>Автор: <strong>{ann.author}</strong> ({ann.authorRole})</span>
                    {ann.registeredUsers && (
                      <span className="font-semibold text-blue-900">
                        {ann.registeredUsers} зареєстровано
                      </span>
                    )}
                  </div>
                </div>

                {ann.actionText && (
                  <button
                    onClick={() => registerForAnnouncement(ann.id)}
                    className={`w-full mt-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      ann.isUserRegistered
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                        : 'bg-blue-700 hover:bg-blue-800 text-white shadow-sm'
                    }`}
                  >
                    {ann.isUserRegistered ? '✓ Ви зареєстровані' : ann.actionText}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. TAB 3: EVENTS */}
      {activeTab === 'events' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingEventsList.map(ev => (
              <div
                key={ev.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-amber-50 text-amber-900 rounded-md">
                      {ev.category}
                    </span>
                  </div>
                  <h3 className="font-bold text-base text-slate-900 mt-3 font-heading">
                    {ev.title}
                  </h3>
                  <div className="space-y-1 mt-2 text-xs text-slate-600">
                    <p className="font-semibold text-blue-900">🗓 {ev.date}</p>
                    <p>📍 {ev.location}</p>
                  </div>
                  <p className="text-xs text-slate-500 mt-3 leading-relaxed">
                    {ev.desc}
                  </p>
                </div>

                <button
                  onClick={() => showToast(`Ви успішно записалися на подію "${ev.title}"!`)}
                  className="w-full mt-4 py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold shadow-sm transition-all"
                >
                  Взяти участь у події
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
