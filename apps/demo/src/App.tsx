import { useState } from "react";
import { Button, Badge, Input, Select } from "@ds-example/ui";

type Brand = "default" | "green" | "orange" | "purple";
type Theme = "light" | "dark";

const BRANDS: { id: Brand; label: string; color: string }[] = [
  { id: "default", label: "Blue",   color: "oklch(0.55 0.22 261)" },
  { id: "green",   label: "Green",  color: "oklch(0.55 0.17 145)" },
  { id: "orange",  label: "Orange", color: "oklch(0.70 0.17 55)" },
  { id: "purple",  label: "Purple", color: "oklch(0.50 0.22 290)" },
];

const ROLE_OPTIONS = [
  { id: "dev",    label: "Developer" },
  { id: "design", label: "Designer" },
  { id: "pm",     label: "Product Manager" },
  { id: "ds",     label: "Design System Engineer" },
];

export function App() {
  const [brand, setBrand] = useState<Brand>("default");
  const [theme, setTheme] = useState<Theme>("light");
  const [email, setEmail] = useState("");

  const activeBrand = BRANDS.find((b) => b.id === brand)!;

  return (
    <div
      data-brand={brand}
      data-theme={theme}
      className="min-h-screen bg-surface text-fg transition-colors duration-300"
    >
      <header className="sticky top-0 z-10 border-b border-border bg-surface/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <span
              className="h-6 w-6 rounded-full transition-colors duration-300"
              style={{ background: activeBrand.color }}
            />
            <span className="font-semibold text-fg">DS Demo</span>
            <Badge variant="info">Tailwind v4</Badge>
          </div>

          <div className="flex items-center gap-2">
            {BRANDS.map((b) => (
              <button
                key={b.id}
                onClick={() => setBrand(b.id)}
                title={b.label}
                className={[
                  "h-6 w-6 rounded-full border-2 transition-transform hover:scale-110 cursor-pointer",
                  b.id === brand ? "border-fg scale-110" : "border-transparent",
                ].join(" ")}
                style={{ background: b.color }}
              />
            ))}
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="ml-2 h-8 w-8 rounded-md border border-border bg-surface-hover text-fg text-sm flex items-center justify-center hovered:bg-surface cursor-pointer"
              title="Toggle dark mode"
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12 space-y-16">

        <section>
          <SectionTitle>Token contract</SectionTitle>
          <p className="mb-6 text-sm text-fg-muted">
            Wissel van brand via de kleurpunten rechtsboven. Alleen de primitive-waarden veranderen —
            de semantic tokens en component-classes blijven identiek.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "--primary", css: "var(--primary)" },
              { label: "--surface", css: "var(--surface)" },
              { label: "--fg",      css: "var(--fg)" },
              { label: "--border",  css: "var(--border)" },
              { label: "--danger",  css: "var(--danger)" },
              { label: "--success", css: "var(--success)" },
              { label: "--warning", css: "var(--warning)" },
              { label: "--info",    css: "var(--info)" },
            ].map(({ label, css }) => (
              <div key={label} className="flex items-center gap-3 rounded-md border border-border p-3">
                <span className="h-8 w-8 shrink-0 rounded-sm border border-border/50" style={{ background: css }} />
                <code className="text-xs text-fg-muted font-mono">{label}</code>
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionTitle>Buttons</SectionTitle>
          <div className="space-y-6">
            <div>
              <Label>Variants</Label>
              <div className="flex flex-wrap gap-3 mt-2">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Danger</Button>
              </div>
            </div>
            <div>
              <Label>Sizes</Label>
              <div className="flex flex-wrap items-center gap-3 mt-2">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>
            <div>
              <Label>States</Label>
              <div className="flex flex-wrap gap-3 mt-2">
                <Button isDisabled>Disabled</Button>
                <Button variant="secondary" isDisabled>Disabled secondary</Button>
              </div>
            </div>
          </div>
        </section>

        <section>
          <SectionTitle>Badges</SectionTitle>
          <div className="flex flex-wrap gap-3 mt-4">
            <Badge variant="default">Default</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="danger">Danger</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="info">Info</Badge>
          </div>
        </section>

        <section>
          <SectionTitle>Form controls</SectionTitle>
          <div className="grid gap-6 sm:grid-cols-2 mt-4">
            <Input label="E-mailadres" placeholder="naam@bedrijf.nl" type="email" value={email} onChange={setEmail} />
            <Input label="Met validatie" placeholder="Probeer leeg te laten" isRequired validate={(v) => (v.length < 3 ? "Minimaal 3 tekens" : null)} />
            <Input label="Beschrijving" description="Optionele hulptekst onder het label" placeholder="Hulptekst demo" />
            <Input label="Uitgeschakeld" placeholder="Kan niet worden bewerkt" isDisabled />
          </div>
        </section>

        <section>
          <SectionTitle>Select</SectionTitle>
          <div className="grid gap-6 sm:grid-cols-2 mt-4">
            <Select label="Rol" options={ROLE_OPTIONS} placeholder="Kies je rol…" />
            <Select label="Uitgeschakeld" options={ROLE_OPTIONS} isDisabled />
          </div>
        </section>

        <section>
          <SectionTitle>Compositie — Card</SectionTitle>
          <p className="mb-6 text-sm text-fg-muted">
            Card is geen library-component — gewoon Tailwind-classes die de tokens gebruiken.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {["Nieuw", "In progress", "Klaar"].map((status, i) => (
              <div key={status} className="rounded-lg border border-border bg-surface p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-fg">Taak {i + 1}</span>
                  <Badge variant={i === 0 ? "info" : i === 1 ? "warning" : "success"}>{status}</Badge>
                </div>
                <p className="text-sm text-fg-muted">Voorbeeld van hoe cards er uitzien met de token-laag.</p>
                <div className="flex gap-2 pt-1">
                  <Button size="sm" variant="primary">Open</Button>
                  <Button size="sm" variant="ghost">Details</Button>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      <footer className="border-t border-border mt-16 py-6 text-center text-xs text-fg-muted">
        Design System Demo · Tailwind v4 · React Aria Components · Token-driven theming
      </footer>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-xl font-semibold text-fg mb-1 pb-2 border-b border-border">{children}</h2>;
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-sm font-medium text-fg-muted">{children}</p>;
}
