// Deterministic random number generator
function seededRandom(seed: number) {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

// Format date to static format (e.g., "Mar 15, 2024")
function formatDate(date: Date): string {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

export function generateMockData(count: number) {
    const topics = [];
    const seed = 12345; // Fixed seed for consistent data

    for (let i = 0; i < count; i++) {
        const id = i + 1;
        const nameLength = Math.floor(seededRandom(seed + i * 3) * 3) + 2; // 2-4 words
        const words = [
            "Luxury", "Budget", "Modern", "Traditional", "Urban", "Rural",
            "beach", "mountain", "city", "forest", "desert", "lake",
            "resorts", "hotels", "retreats", "lodges", "villas", "apartments",
            "in", "near", "around", "by",
            "Thailand", "Vietnam", "Singapore", "Malaysia", "Indonesia", "Philippines",
            "with", "featuring", "including",
            "spa", "pool", "garden", "view", "beach access", "water sports"
        ];

        let name = "";
        for (let j = 0; j < nameLength; j++) {
            const wordIndex = Math.floor(seededRandom(seed + i * 3 + j) * words.length);
            name += words[wordIndex] + (j < nameLength - 1 ? " " : "");
        }

        const brandsDiscovered = Math.floor(seededRandom(seed + i) * 100) + 20;
        const daysAgo = Math.floor(seededRandom(seed + i * 2) * 30);
        const date = new Date();
        date.setDate(date.getDate() - daysAgo);

        topics.push({
            id,
            name: name.trim(),
            brandsDiscovered,
            lastUpdated: formatDate(date)
        });
    }

    return topics;
} 