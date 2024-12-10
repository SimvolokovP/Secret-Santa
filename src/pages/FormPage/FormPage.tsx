import { FC, useState } from "react";
import { IForm } from "../../models/IForm";
import useUser from "../../hooks/useUser";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";

const FormPage: FC = () => {
  const [formData, setFormData] = useState<IForm>({
    name: "",
    text: "",
    wishList: "",
  });

  const { createUser, userStatus } = useUser();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createUser(formData);
    window.location.reload(); //hmhmhmh
  };

  return userStatus.loading ? (
    <LoadingScreen />
  ) : (
    <div className="page form-page">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
          <textarea
            name="text"
            value={formData.text}
            onChange={handleChange}
            placeholder="Enter main text"
            required
          />
          <textarea
            name="wishList"
            value={formData.wishList}
            onChange={handleChange}
            placeholder="Enter wishlist"
            required
          />
          <button type="submit">123</button>
        </form>
      </div>
    </div>
  );
};

export default FormPage;
