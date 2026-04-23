const Form = () => {

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const data = new FormData(e.target)
        console.log('clicked', data.get('firstName'))
    }
    return (
        <div>
            Form Component
            <br/>
            <br/>
            <form onSubmit={onSubmitHandler} >
                <input name="firstName" placeHolder="enter name" />
                <br/>
                <input name="number" placeHolder="enter number"/>
                <br/>
                <button type="submit">submit</button>
            </form>
        </div>
    )
}

export default Form;


// import React, { useState } from "react";

const Form2 = () => {
  const [values, setValues] = useState({
    firstName: "",
    number: "",
  });

  const [errors, setErrors] = useState<{
    firstName?: string;
    number?: string;
  }>({});

  const validate = (name: string, value: string) => {
    let error = "";

    if (name === "firstName") {
      if (!value.trim()) error = "Name is required";
    }

    if (name === "number") {
      if (!/^[0-9]*$/.test(value)) {
        error = "Only numbers allowed";
      }
    }

    return error;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // update values
    setValues((prev) => ({ ...prev, [name]: value }));

    // validate this field only
    const error = validate(name, value);

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // final validation check
    const newErrors: typeof errors = {};
    Object.keys(values).forEach((key) => {
      const error = validate(key, values[key as keyof typeof values]);
      if (error) newErrors[key as keyof typeof values] = error;
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    console.log("Submitted:", values);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="firstName"
        value={values.firstName}
        onChange={handleChange}
        placeholder="enter name"
      />
      {errors.firstName && <p style={{ color: "red" }}>{errors.firstName}</p>}

      <br />

      <input
        name="number"
        value={values.number}
        onChange={handleChange}
        placeholder="enter number"
      />
      {errors.number && <p style={{ color: "red" }}>{errors.number}</p>}

      <br />

      <button type="submit">Submit</button>
    </form>
  );
};

// export default Form;


