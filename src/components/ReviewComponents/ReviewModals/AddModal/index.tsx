import { useContext, useEffect, useRef } from "react";
import { ReviewContext } from "../../../../providers/ReviewsContext/ReviewsContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  IReviewForm,
  reviewFormSchema,
} from "../../ReviewForms/AddForm/ReviewFormSchema";

export const AddReviewModal = ({ setIsOpenAdd }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IReviewForm>({
    resolver: zodResolver(reviewFormSchema),
  });

  const modalRef = useRef(null);

  useEffect(() => {
    const handleOutClick = (e) => {
      if (!modalRef.current?.contains(e.target)) {
        setIsOpenAdd(false);
      }
    };

    window.addEventListener("mousedown", handleOutClick);

    return () => {
      window.removeEventListener("mousedown", handleOutClick);
    };
  }, []);

  const { addReview } = useContext(ReviewContext);

  const submit = (formData) => {
    addReview(formData);
  };

  return (
    <div role="dialog">
      <div>
        <h1>Avaliação</h1>

        <form onSubmit={() => handleSubmit(submit)}>
          <select {...register("score")}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          {errors.score ? <p>{errors.score.message}</p> : null}

          <input type="text" {...register("description")} />
          {errors.description ? <p>{errors.description.message}</p> : null}
        </form>
      </div>
    </div>
  );
};
