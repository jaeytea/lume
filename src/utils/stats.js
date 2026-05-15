export const getWordCount = (html = "") => {
  const text = html.replace(/<[^>]*>/g, "");
  return text.trim() ? text.trim().split(/\s+/).length : 0;
};

export const calcStreak = (journals = []) => {
  const days = new Set();

  journals.forEach((j) =>
    j.entries.forEach((e) => {
      const d = new Date(e.updatedAt || e.createdAt);
      days.add(d.toDateString());
    }),
  );

  let streak = 0;
  const now = new Date();

  for (let i = 0; i < 365; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);

    if (days.has(d.toDateString())) streak++;
    else if (i > 0) break;
  }

  return streak;
};
