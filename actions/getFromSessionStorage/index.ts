export const getFromSessionStorage = (props) => {
    const {key} = props
    try {
        return sessionStorage.getItem(key)
      } catch (e) {
        console.log(e);
      }
}