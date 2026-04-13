import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function VannesAI() {
  const SECRET_PASSWORD = "bananapower";

  const [loggedIn, setLoggedIn] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");

  const [messages, setMessages] = useState([
    { role: "bot", text: "Hi queen 🌷✨ I'm VannesAI 💕" }
  ]);

  const [input, setInput] = useState("");

  const [selectedDate] = useState(new Date());

  // 🧠 REMINDERS
  const [reminders, setReminders] = useState([]);
  const [reminderInput, setReminderInput] = useState("");

  // 📝 sticky notes
  const [notes, setNotes] = useState([]);
  const [noteInput, setNoteInput] = useState("");

  // 📔 diary (NEW)
  const [diary, setDiary] = useState([]);
  const [diaryInput, setDiaryInput] = useState("");

  // 💖 quotes
  const [quotes] = useState([
    "You’re doing better than you think 💕",
    "Small steps still move you forward 🌷",
    "You are your own glow-up 👑",
    "It’s okay to go slowly 💖",
    "Future you is cheering for you ✨"
  ]);
  const [quote, setQuote] = useState("You’re doing better than you think 💕");

  // 🎯 focus timer
  const [focusSeconds, setFocusSeconds] = useState(1500);
  const [isFocusRunning, setIsFocusRunning] = useState(false);

  // 🎮 GAMIFICATION
  const [xp, setXp] = useState(0);
  const [coins, setCoins] = useState(0);

  // 🏋️ WORKOUT CHECK
  const [workedOutToday, setWorkedOutToday] = useState(false);

  const level = Math.floor(xp / 100) + 1;

  // 🛍️ REWARD SHOP
  const shopItems = [
    { id: 1, name: "☕ 10 min break", cost: 20 },
    { id: 2, name: "🍫 snack time", cost: 30 },
    { id: 3, name: "📱 15 min phone break", cost: 50 },
    { id: 4, name: "💖 unlock new quote pack", cost: 40 }
  ];

  const buyItem = (item) => {
    if (coins < item.cost) {
      alert("Not enough coins 😭");
      return;
    }
    setCoins((c) => c - item.cost);
    alert(`Unlocked: ${item.name} 💖`);
  };

  const todayDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  const handleWorkoutCheck = () => {
    if (!workedOutToday) {
      setWorkedOutToday(true);
      setCoins(c => c + 35);
      setXp(x => x + 20);
    } else {
      setWorkedOutToday(false);
    }
  };

  const callAI = async (text) => {
    const t = text.toLowerCase();
    if (t.includes("help")) return "I’m here for you 💖";
    if (t.includes("sad")) return "Hey queen 💕 I’ve got you";
    return `I hear you: ${text}`;
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", text: input };
    const botText = await callAI(input);
    setMessages((p) => [...p, userMsg, { role: "bot", text: botText }]);
    setInput("");
  };

  const handleLogin = () => {
    if (passwordInput === SECRET_PASSWORD) setLoggedIn(true);
    else setLoginError("Wrong password 😭");
  };

  // REMINDERS
  const addReminder = () => {
    if (!reminderInput.trim()) return;
    setReminders([...reminders, { id: Date.now(), text: reminderInput, done: false }]);
    setReminderInput("");
  };

  const toggleReminder = (id) => {
    setReminders(reminders.map(r => r.id === id ? { ...r, done: !r.done } : r));
  };

  const deleteReminder = (id) => {
    setReminders(reminders.filter(r => r.id !== id));
  };

  // NOTES
  const addNote = () => {
    if (!noteInput.trim()) return;
    setNotes([...notes, { id: Date.now(), text: noteInput }]);
    setNoteInput("");
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  // DIARY ✨
  const addDiary = () => {
    if (!diaryInput.trim()) return;
    setDiary([...diary, { id: Date.now(), text: diaryInput }]);
    setDiaryInput("");
  };

  const deleteDiary = (id) => {
    setDiary(diary.filter(d => d.id !== id));
  };

  useEffect(() => {
    let interval;
    if (isFocusRunning && focusSeconds > 0) {
      interval = setInterval(() => setFocusSeconds(s => s - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isFocusRunning, focusSeconds]);

  const startFocus = () => setIsFocusRunning(true);
  const pauseFocus = () => setIsFocusRunning(false);
  const resetFocus = () => {
    setIsFocusRunning(false);
    setFocusSeconds(1500);
  };

  if (!loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 to-yellow-100">
        <div className="bg-white/60 p-6 rounded-2xl shadow-xl w-80">
          <h1 className="text-pink-500 font-bold text-center mb-3">VannesAI 🔐</h1>
          <Input
            type="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
          />
          <Button className="w-full mt-3 bg-pink-400 text-yellow-100 font-bold" onClick={handleLogin}>
            Enter 👑
          </Button>
          {loginError && <p className="text-red-400 text-sm mt-2 text-center">{loginError}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-pink-200 to-yellow-100">

      {/* HEADER */}
      <div className="bg-white/60 p-4 rounded-2xl flex justify-between items-center">
        <h1
          style={{ fontFamily: "Pacifico, cursive" }}
          className="text-pink-500 text-5xl font-bold"
        >
          VannesAI 💖
        </h1>
        <p>{todayDate}</p>
      </div>

      {/* HUD */}
      <div className="mt-3 bg-white/60 p-3 rounded-2xl flex justify-between text-sm font-bold text-pink-500">
        <span>⭐ Level: {level}</span>
        <span>💖 XP: {xp}</span>
        <span>🪙 Coins: {coins}</span>
      </div>

      {/* CHAT */}
      <Card className="mt-4">
        <CardContent className="h-64 overflow-y-auto">
          {messages.map((m, i) => (
            <p key={i}>{m.text}</p>
          ))}
        </CardContent>
      </Card>

      <div className="flex gap-2 mt-2">
        <Input value={input} onChange={(e) => setInput(e.target.value)} />
        <Button className="bg-pink-400 text-yellow-100 font-bold" onClick={sendMessage}>
          Send 💌
        </Button>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">

        <div className="bg-white/60 p-4 rounded-2xl">
          <h2 className="text-pink-500 font-bold">Quote 💖</h2>
          <p>{quote}</p>
          <Button className="bg-pink-400 text-yellow-100 font-bold mt-2" onClick={() => setQuote(quotes[Math.floor(Math.random() * quotes.length)])}>New</Button>
        </div>

        <div className="bg-white/60 p-4 rounded-2xl">
          <h2 className="text-pink-500 font-bold">Calendar 📅</h2>
          <p>{selectedDate.toDateString()}</p>
        </div>

        <div className="bg-white/60 p-4 rounded-2xl">
          <h2 className="text-pink-500 font-bold">Focus 🎯</h2>
          <p className="text-lg font-bold">{Math.floor(focusSeconds / 60)}:{(focusSeconds % 60).toString().padStart(2, "0")}</p>
          <div className="flex gap-2 mt-2">
            <Button className="bg-pink-400 text-yellow-100 font-bold" onClick={startFocus}>Start</Button>
            <Button className="bg-pink-400 text-yellow-100 font-bold" onClick={pauseFocus}>Pause</Button>
            <Button className="bg-pink-400 text-yellow-100 font-bold" onClick={resetFocus}>Reset</Button>
          </div>
        </div>

        {/* REMINDERS */}
        <div className="bg-white/60 p-4 rounded-2xl">
          <h2 className="text-pink-500 font-bold">Reminders 🧠</h2>
          <div className="flex gap-2 mt-2">
            <Input value={reminderInput} onChange={(e) => setReminderInput(e.target.value)} />
            <Button onClick={addReminder} className="bg-pink-400 text-yellow-100 font-bold">+</Button>
          </div>
          <ul className="mt-2 text-sm space-y-2">
            {reminders.map(r => (
              <li key={r.id} className="flex justify-between items-center">
                <span onClick={() => toggleReminder(r.id)} className={`cursor-pointer ${r.done ? "line-through opacity-50" : ""}`}>{r.text}</span>
                <Button onClick={() => deleteReminder(r.id)} className="text-xs bg-red-400 text-white">delete</Button>
              </li>
            ))}
          </ul>
        </div>

        {/* NOTES */}
        <div className="bg-white/60 p-4 rounded-2xl">
          <h2 className="text-pink-500 font-bold">Sticky Notes 📝</h2>
          <div className="flex gap-2 mt-2">
            <Input value={noteInput} onChange={(e) => setNoteInput(e.target.value)} />
            <Button onClick={addNote} className="bg-pink-400 text-yellow-100 font-bold">+</Button>
          </div>
          <ul className="mt-2 text-sm space-y-2">
            {notes.map(n => (
              <li key={n.id} className="flex justify-between items-center">
                <span>🟡 {n.text}</span>
                <Button onClick={() => deleteNote(n.id)} className="text-xs bg-red-400 text-white">delete</Button>
              </li>
            ))}
          </ul>
        </div>

        {/* DIARY */}
        <div className="bg-white/60 p-4 rounded-2xl">
          <h2 className="text-pink-500 font-bold">Diary 📔</h2>
          <div className="flex gap-2 mt-2">
            <Input value={diaryInput} onChange={(e) => setDiaryInput(e.target.value)} placeholder="Write your thoughts..." />
            <Button onClick={addDiary} className="bg-pink-400 text-yellow-100 font-bold">+</Button>
          </div>
          <ul className="mt-2 text-sm space-y-2">
            {diary.map(d => (
              <li key={d.id} className="flex justify-between items-center">
                <span>📖 {d.text}</span>
                <Button onClick={() => deleteDiary(d.id)} className="text-xs bg-red-400 text-white">delete</Button>
              </li>
            ))}
          </ul>
        </div>

        {/* WORKOUT CHECK */}
        <div className="bg-white/60 p-4 rounded-2xl">
          <h2 className="text-pink-500 font-bold">Workout 💪</h2>
          <p className="text-sm mt-1">Did you work out today?</p>
          <Button
            onClick={handleWorkoutCheck}
            className={`mt-2 font-bold ${workedOutToday ? "bg-green-400 text-white" : "bg-pink-400 text-yellow-100"}`}
          >
            {workedOutToday ? "✔ Completed (+35 coins)" : "Mark as Done 💖"}
          </Button>
        </div>

        {/* SHOP */}
        <div className="bg-white/60 p-4 rounded-2xl">
          <h2 className="text-pink-500 font-bold">Reward Shop 🛍️</h2>
          <ul className="mt-2 space-y-2 text-sm">
            {shopItems.map(item => (
              <li key={item.id} className="flex justify-between items-center">
                <span>{item.name} - 🪙 {item.cost}</span>
                <Button
                  onClick={() => buyItem(item)}
                  className="bg-pink-400 text-yellow-100 text-xs font-bold"
                >
                  Buy 💖
                </Button>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}
