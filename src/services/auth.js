import axios from "./api"

export const isBrowser = () => typeof window !== "undefined"

export const getUser = () =>
  isBrowser() && window.localStorage.getItem("bearer")
    ? JSON.parse(window.localStorage.getItem("bearer"))
    : {}

const setUser = user =>
  window.localStorage.setItem("bearer", JSON.stringify(user))

export const handleLogin = async (name, password, image, phone, email) => {
  let form_data = new FormData()
  form_data.append("image", image)
  form_data.append("phone", phone)
  form_data.append("password", password)
  form_data.append("name", name)
  if (email) {
    form_data.append("email", email)
  }
  console.log(name)
  try {
    let data = await axios.put("/auth/signup", form_data, {
      headers: {
        "content-type": "multipart/form-data",
      },
    })
    setUser({
      token: data.data.token,
      uid: data.data.userId,
    })
    return data.data
  } catch (error) {
    console.log(error.response.data)
    return error.response.data
  }
}

export const isLoggedIn = () => {
  const user = getUser()

  return !!user.uid
}

export const logout = () => {
  setUser({})
}
