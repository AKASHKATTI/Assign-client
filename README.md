```markdown
# Assign Client 🚀
### *Frontend UI for the AI-Powered CSV Importer*

This is the web client for the **AI-Powered CSV Importer**, built using the **Next.js App Router** framework. It provides an intuitive, step-by-step user interface to upload raw CSV files, visualize AI-assisted column mapping metadata, preview data formatting, and sync validated datasets directly to the backend.

---

## 🛠️ Tech Stack & Architecture

* **Framework:** Next.js (App Router) & React
* **Styling:** Tailwind CSS & Lucide Icons
* **UI Components:** Radix UI primitives via Shadcn UI
* **Language:** TypeScript / JavaScript
* **HTTP Client:** Axios

### 📂 Project Structure

```text
client/
├── app/             # Next.js App Router pages, layouts, and route groups
├── components/      # Reusable UI elements (Upload zones, Tables, Steps)
├── hooks/           # Custom React hooks for global state & fetch abstractions
├── lib/             # Utility definitions, Axios clients, and schema helpers
├── public/          # Static assets (logos, icons, illustrations)
├── styles/          # Global styles & Tailwind configuration overrides
├── package.json     # Configuration file for dependencies and scripts
└── README.md        # Documentation

```

---

## ⚙️ Getting Started

### Prerequisites

* Node.js (v18.x or later recommended)
* Running instance of the [Assign Backend Service](https://github.com/AKASHKATTI/Assign-backend)

### Installation

1. **Clone the repository:**
```bash
git clone [https://github.com/AKASHKATTI/Assign-client.git](https://github.com/AKASHKATTI/Assign-client.git)
cd Assign-client

```


2. **Install dependencies:**
```bash
npm install

```


3. **Configure Environment Variables:**
Create a `.env.local` file in the root directory and specify your backend service address:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000

```


4. **Spin up the development environment:**
```bash
npm run dev

```


Open [http://localhost:3000](http://localhost:3000) inside your browser to view the application interface.

---

## 💡 Key Features Highlighted

* **Streamlined Multi-Step Stepper:** Guides users cleanly through file loading, confirming the Gemini AI schema-match suggestions, and final server sync.
* **Smart UI Feedback:** Granular loading screens, micro-animations, and dynamic progress loaders track processing cycles.
* **Client-Side Verification Frameworks:** Flags configuration errors and network timeouts explicitly before heavy network payloads transfer.

---

## 🔗 Connected Repositories

This frontend relies entirely on its companion server layer to process uploads and execute Google Gemini data mapping logic:

* **Backend Core API:** [AKASHKATTI/Assign-backend](https://github.com/AKASHKATTI/Assign-backend)

---

## 🚀 Deployment

The stack is optimized for seamless deployment workflows across major cloud architectures:

* **Frontend UI hosting:** [Vercel](https://vercel.com) (Recommended for native Next.js serverless orchestration)
* **Backend processing:** [Render](https://render.com) / Railway

---

## 📄 License

This project is licensed under the **MIT License**.

---

**Author:** [Akash Katti](https://www.google.com/search?q=https://github.com/AKASHKATTI)

*Crafting efficient full-stack solutions with AI-native workflows.*

```

```
