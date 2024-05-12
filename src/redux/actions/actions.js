// actions.js
import axios from "axios";
import {
  FILTER_FUNC,
  SET_FILTERS,
  SET_PAGE_TYPE,
  SET_SEARCHTERM,
  SET_SELECTEDFILTERS,
  SET_STUDENT,
  SET_WINDOW_WIDTH,
} from "./actionTypes";
import {
  FETCH_LISTITEMS_FAIL,
  FETCH_LISTITEMS_START,
  FETCH_LISTITEMS_SUCCESS,
  OPEN_MODAL,
  CLOSE_MODAL,
} from "./actionTypes";

// export const filterFunc =
//   (selectedFilters, pageType, searchTerm) => async (dispatch) => {
//     dispatch({ type: FETCH_LISTITEMS_START });
//     console.log(pageType, "this is page type");

//     // if (pageType !== "room_finder") {
//     //   try {
//     //     // GET isteği yapılacak URL
//     //     const baseUrl =
//     //       pageType === "invoices"
//     //         ? `${process.env.REACT_APP_BASE_URL}${pageType}`
//     //         : `${process.env.REACT_APP_BASE_URL}${pageType}`;
//     //     let queryParams = "";

//     //     const convertValue = (value) => {
//     //       if (typeof value === "boolean") {
//     //         return value ? "1" : "0";
//     //       } else if (
//     //         value &&
//     //         typeof value === "object" &&
//     //         "$d" in value &&
//     //         "$y" in value
//     //       ) {
//     //         // Moment.js benzeri bir tarih nesnesi kontrolü
//     //         const date = new Date(value.$d);
//     //         if (!isNaN(date.getTime())) {
//     //           let day = date.getDate().toString().padStart(2, "0");
//     //           let month = (date.getMonth() + 1).toString().padStart(2, "0");
//     //           let year = date.getFullYear();
//     //           return `${year}-${month}-${day}`;
//     //         }
//     //       }
//     //       return value;
//     //     };

//     //     if (Object.keys(selectedFilters).length > 0) {
//     //       queryParams = Object.entries(selectedFilters)
//     //         .filter(([key, _]) => key !== "range_types") // range_type anahtarını ve değerini çıkar
//     //         .map(
//     //           ([key, value]) =>
//     //             `${encodeURIComponent(key)}=${encodeURIComponent(
//     //               convertValue(value)
//     //             )}`
//     //         )
//     //         .join("&");
//     //     }

//     //     const url =
//     //       baseUrl +
//     //       (queryParams
//     //         ? searchTerm.searchTerm
//     //           ? "?" +
//     //             queryParams +
//     //             `&${searchTerm.searchTermType}=` +
//     //             searchTerm.searchTerm
//     //           : "?" + queryParams
//     //         : searchTerm.searchTerm
//     //         ? "?" + `${searchTerm.searchTermType}=` + searchTerm.searchTerm
//     //         : "");

//     //     let accessToken = localStorage.getItem("accessToken");
//     //     let token = localStorage.getItem("loginUser");

//     //     const response = await axiosInstance.get(url, {
//     //       headers: {
//     //         Authorization: `Bearer ${accessToken}`, // Bearer token burada ekleniyor
//     //         XRefreshToken: `${token}`, // Bearer token burada ekleniyor
//     //         "Content-Type": "application/json", // Eğer gönderdiğiniz veri JSON formatındaysa bu başlık gerekli
//     //       },
//     //     });
//     //     // Axios ile GET isteği yapılıyor

//     //     //const response = await axios.get(url, {});
//     //     // Yanıtın içeriğini konsola yazdır

//     //     if (response.data[pageType]) {
//     //       dispatch({ type: FETCH_LISTITEMS_SUCCESS });
//     //       dispatch({
//     //         type: FILTER_FUNC,
//     //         payload: response.data[pageType],
//     //       });
//     //     }
//     //   } catch (error) {
//     //     // Hata durumunda hata mesajını konsola yazdır
//     //     dispatch({ type: FETCH_LISTITEMS_FAIL });
//     //     dispatch({
//     //       type: FILTER_FUNC,
//     //       payload: [],
//     //     });
//     //     console.error("Error fetching data:", error);
//     //   }
//     // }
//   };

export const fetchListItems = () => async (dispatch) => {
    console.log('çalışt');
  dispatch({ type: FETCH_LISTITEMS_START });

  try {
    // GET isteği yapılacak URL
    let url = `https://5fc9346b2af77700165ae514.mockapi.io/products`;

    const response = await axios.get(url);
    // Yanıtın içeriğini konsola yazdır

    dispatch({
      type: FETCH_LISTITEMS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    // Hata durumunda hata mesajını konsola yazdır
    console.error("Error fetching data:", error);
    dispatch({ type: FETCH_LISTITEMS_FAIL });
  }
};

export const openModal = (content, contentType) => ({
  type: OPEN_MODAL,
  payload: { content, contentType },
});

export const closeModal = () => ({
  type: CLOSE_MODAL,
});
