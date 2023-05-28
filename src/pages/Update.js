// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import supabase from "../config/supabaseClient";

// const Update = () => {
//   const [title, setTitle] = useState("");
//   const [method, setMethod] = useState("");
//   const [rating, setRating] = useState("");
//   const [formError, setFormError] = useState(null);

//   const navigate = useNavigate();

//   const { id } = useParams();

//   const hanldeSubmit = async (e) => {
//     e.preventDefault();

//     if (!title || !method || !rating) {
//       setFormError("Please fill in all the fields correctly.");
//       return;
//     }

//     const { data, error } = await supabase
//       .from("smoothies")
//       .update({ title, method, rating })
//       .eq("id", );

//     // const { data, error } = await supabase
//     //   .from("smoothies")
//     //   .update({ title, method, rating })
//     //   .eq("id", id);

//     console.log("did it start");

//     if (error) {
//       console.log(error);
//       setFormError("Please fill in all the fileds correctly");
//     }

//     console.log(data);

//     if (data) {
//       console.log(data);
//       setFormError(null);
//       navigate("/");
//       console.log("did it start");
//     }
//   };

//   useEffect(() => {
//     const fetchSmoothies = async () => {
//       const { data, error } = await supabase
//         .from("smoothies")
//         .select()
//         .eq("id", id)
//         .single();
//       if (error) {
//         console.log(error);
//         navigate("/", { replace: true });
//       }
//       if (data) {
//         setTitle(data.title);
//         setMethod(data.method);
//         setRating(data.rating);
//       }
//     };

//     fetchSmoothies();
//   }, [id, navigate]);

//   return (
//     <div className='page update'>
//       <form onSubmit={hanldeSubmit}>
//         <label htmlFor='title'>Title:</label>
//         <input
//           type='text'
//           id='title'
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />

//         <label htmlFor='method'>Method:</label>
//         <textarea
//           id='method'
//           value={method}
//           onChange={(e) => setMethod(e.target.value)}
//         />

//         <label htmlFor='rating'>Rating:</label>
//         <input
//           type='number'
//           id='rating'
//           value={rating}
//           onChange={(e) => setRating(e.target.value)}
//         />

//         <button>Create Smoothie Recipe</button>

//         {formError && <p className='error'>{formError}</p>}
//       </form>
//     </div>
//   );
// };

// export default Update;

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import supabase from "../config/supabaseClient";

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [rating, setRating] = useState("");
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !method || !rating) {
      setFormError("Please fill in all the fields correctly.");
      return;
    }

    const { data, error } = await supabase
      .from("smoothies")
      .update({ title, method, rating })
      .eq("id", id);

    if (error) {
      setFormError("Please fill in all the fields correctly.");
    } else {
      setFormError(null);
      navigate("/");
    }
  };

  // const handleSubmit = async (e) => {
  //   supabase
  //     .from("smoothies")
  //     .update({ title, method, rating })
  //     .eq("id", id)
  //     .then((response) => {
  //       if (response.error) {
  //         console.error("Error updating record:", response.error);
  //         navigate("/");
  //         return;
  //       }
  //       console.log("Record updated successfully:", response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error updating record:", error);
  //     });
  // };

  useEffect(() => {
    const fetchSmoothie = async () => {
      const { data, error } = await supabase
        .from("smoothies")
        .select()
        .eq("id", id)
        .single();

      if (error) {
        navigate("/", { replace: true });
      }
      if (data) {
        setTitle(data.title);
        setMethod(data.method);
        setRating(data.rating);
      }
    };

    fetchSmoothie();
  }, [id, navigate]);

  return (
    <div className='page create'>
      <form onSubmit={handleSubmit}>
        <label htmlFor='title'>Title:</label>
        <input
          type='text'
          id='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor='method'>Method:</label>
        <textarea
          id='method'
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        />

        <label htmlFor='rating'>Rating:</label>
        <input
          type='number'
          id='rating'
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <button>Update Smoothie Recipe</button>

        {formError && <p className='error'>{formError}</p>}
      </form>
    </div>
  );
};

export default Update;
