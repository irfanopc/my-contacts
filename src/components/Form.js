import { useForm } from "react-hook-form";
const Form = ({ formSub }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSub = (data) => {
    data.id = Date.now();
    data.fav = false;
    formSub(data);
    console.log(data);

    reset();
  };

  return (
    <div className="col-sm-4 shadow rounded g-5">
      <h1 className="text-center pt-3 text-secondary h2">Add Contact</h1>
      <form onSubmit={handleSubmit(onSub)}>
        <div className="form-group">
          <label className="col-form-label">Name:</label>
          <input
            className="form-control"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <small className="text-danger">{errors.name.message}</small>
          )}
        </div>
        <div className="form-group">
          <label className="col-form-label">Email:</label>
          <input
            type="text"
            className="form-control"
            {...register("Email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.Email && (
            <small className="text-danger">{errors.Email.message}</small>
          )}
        </div>
        <div className="form-group">
          <label className="col-form-label">Phone:</label>
          <input
            type="text"
            className="form-control"
            {...register("Phone", {
              required: "Phone is required",
              pattern: {
                value:
                  /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
                message: "Invalid phone no",
              },
            })}
          />
          {errors.Phone && (
            <small className="text-danger">{errors.Phone.message}</small>
          )}
        </div>
        <input
          type="submit"
          className="btn btn-primary my-3"
          value="Add Contact"
        />
      </form>
    </div>
  );
};

export default Form;