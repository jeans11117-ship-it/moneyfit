type NumberInputProps = {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  suffix: string;
  min?: number;
  max?: number;
  step?: number;
};

export function NumberInput({ id, label, value, onChange, suffix, min = 0, max = 100, step = 0.1 }: NumberInputProps) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <div className="input-wrap">
        <input id={id} type="number" inputMode="decimal" value={value} min={min} max={max} step={step}
          onChange={(event) => {
            const parsed = Number(event.target.value);
            onChange(Number.isFinite(parsed) ? Math.min(max, Math.max(min, parsed)) : min);
          }}
        />
        <span className="input-suffix">{suffix}</span>
      </div>
    </div>
  );
}
