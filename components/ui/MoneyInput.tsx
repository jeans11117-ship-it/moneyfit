type MoneyInputProps = {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  suffix?: string;
  hint?: string;
  min?: number;
  max?: number;
};

export function MoneyInput({ id, label, value, onChange, suffix = "만원", hint, min = 0, max }: MoneyInputProps) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <div className="input-wrap">
        <input
          id={id}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          value={value ? value.toLocaleString("ko-KR") : ""}
          placeholder="0"
          aria-describedby={hint ? `${id}-hint` : undefined}
          onChange={(event) => {
            const next = Number(event.target.value.replace(/[^0-9]/g, ""));
            onChange(Math.min(max ?? Number.MAX_SAFE_INTEGER, Math.max(min, Number.isFinite(next) ? next : 0)));
          }}
        />
        <span className="input-suffix">{suffix}</span>
      </div>
      {hint && <span className="helper" id={`${id}-hint`}>{hint}</span>}
    </div>
  );
}
