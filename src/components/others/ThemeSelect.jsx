import Select from "react-select";

const ThemeSelect = ({ themes, form, setForm, errors }) => {
  const options = themes?.map((theme) => ({
    value: theme.id,
    label: theme.name,
  }));

  const handleChange = (selectedOption) => {
    setForm({ ...form, theme_id: selectedOption ? selectedOption.value : "" });
  };

  return (
    <div>
      <Select
        options={options}
        value={options.find((opt) => opt.value === form.theme_id) || null}
        onChange={handleChange}
        placeholder="Pilih Tema..."
        isClearable
        classNamePrefix="select"
        styles={{
          control: (base, state) => ({
            ...base,
            borderColor: errors.theme_id
              ? "#ef4444" // merah kalau error
              : state.isFocused
              ? "#f472b6" // pink saat focus
              : "#d1d5db", // default gray
            boxShadow: state.isFocused ? "0 0 0 1px #f472b6" : "none",
            "&:hover": { borderColor: "#f472b6" },
            borderRadius: "0.5rem",
            minHeight: "36px",
            fontSize: "0.875rem",
          }),
          option: (base, { isFocused, isSelected }) => ({
            ...base,
            backgroundColor: isSelected ? "#f472b6" : isFocused ? "#fbcfe8" : "white",
            color: isSelected ? "white" : "#374151",
            fontSize: "0.875rem",
          }),
          placeholder: (base) => ({
            ...base,
            color: "#9ca3af",
          }),
        }}
      />
      {errors.user_id && <p className="text-red-500 text-xs mt-1">{errors.user_id}</p>}
    </div>
  );
};

export default ThemeSelect;
