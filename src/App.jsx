import { useState } from 'react'
import arrow from './assets/icon-arrow.svg'
import './App.css'

function App() {

  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const [data, setData] = useState({
    yearResult: "--",
    monthResult: "--",
    dayResult: "--"
  })

  const [errors, setErrors] = useState({
    yearError: false,
    yearEmptyError:false,
    monthError: false,
    monthEmptyError: false,
    dayError: false,
    dayEmptyError:false,
    formError: false,
  })

  const currDate = new Date()
  let date = new Date(`${month}-${day}-${year}`)
  let invalidYear = year > currDate.getFullYear() || year < 1
  let invalidMonth = month < 1 || month > 12
  let invalidDay = day > 31 || day < 1
  let thirtyDays = month == 4 && day > 30 || month == 6 && day > 30 || month == 9 && day > 30 || month == 11 && day > 30
  let twentyEightDays = month == 2 && day > 29
  let invalidLeapYear = month == 2 && date.getMonth() == 2

  const checks = () => {

    invalidYear ? setErrors((prevErrors) => ({...prevErrors, yearError: true})) : setErrors((prevErrors) => ({...prevErrors, yearError: false}))
    invalidMonth ? setErrors((prevErrors) => ({...prevErrors, monthError: true})) : setErrors((prevErrors) => ({...prevErrors, monthError: false}))
    invalidDay ? setErrors((prevErrors) => ({...prevErrors, dayError: true})) : setErrors((prevErrors) => ({...prevErrors, dayError: false}))
    

    if (thirtyDays || twentyEightDays || invalidLeapYear) {
      setErrors({
        yearError: false,
        monthError: false,
        dayError: false,
        formError: true
      })

    } else {
        setErrors((prevErrors) => ({...prevErrors, formError: false}))
    } 
    
    if (year == "") {
      setErrors((prevErrors) => ({
        ...prevErrors, 
        yearError: false,
        yearEmptyError: true
      }))

    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        yearEmptyError: false
      }))
    }

    if (month == "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        monthError: false,
        monthEmptyError: true
      }))

    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        monthEmptyError: false
      }))
    }

    if (day == "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        dayError: false,
        dayEmptyError: true
      }))

    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        dayEmptyError: false
      }))
    }

  }

  const runProgram = (e) => {
    e.preventDefault()
    checks()
    
    if (invalidYear || invalidMonth || invalidDay || thirtyDays || twentyEightDays || invalidLeapYear || errors.dayEmptyError || errors.monthEmptyError || errors.yearEmptyError) {
      return console.log("Error")
    }

    let currYear = currDate.getFullYear()
    let currMonth = currDate.getMonth()
    let currDay = currDate.getDate()

    let inputYear = date.getFullYear()
    let inputMonth = date.getMonth()
    let inputDay = date.getDate()

    let y = currYear - inputYear
    let m;
    let d;
      
    if (currMonth >= inputMonth) {
      m = currMonth - inputMonth

    } else {
      y--
      m = 12 + currMonth - inputMonth
    }

    if (currDay >= inputDay) {
      d = currDay - inputDay

    } else {
      m--;
      d = 31 + currDay - inputDay

      if (m < 0) {
        m = 11;
        y--;
      }
    }

      console.log(currDate.get)

      setData((prevData) => ({
        ...prevData,
        yearResult: y,
        monthResult: m,
        dayResult: d
      }))

    }

  return (
    <>
    <div className="container">
        <form>
          <div className="inputs">
            <label>
              <p className="inputText">Day</p>
              <input 
                value={day}
                type="number" 
                placeholder="DD"
                onChange={e => setDay(e.target.value)}       
                className={`inputBox ${errors.dayEmptyError || errors.formError || errors.dayError ? `errorBox` : `` }`}         
              />
              { errors.dayEmptyError ? <p className="errorText">This field is required</p> : null }
              { errors.formError ? <p className="errorText">Must be a valid date</p> : null }
              { errors.dayError ? <p className="errorText">Must be a valid day</p> : null }
            </label>
            <label>
              <p className="inputText">Month</p>
              <input 
                value={month}
                type="number" 
                placeholder="MM"
                onChange={e => setMonth(e.target.value)}      
                className={`inputBox ${errors.monthEmptyError || errors.formError || errors.monthError ? `errorBox` : `` }`}
              />
              { errors.monthEmptyError ? <p className="errorText">This field is required</p> : null }
              { errors.monthError ? <p className="errorText">Must be a valid month</p> : null }
            </label>
            <label>
              <p className="inputText">Year</p>
              <input 
                value={year}
                type="number" 
                placeholder="YYYY"
                onChange={e => setYear(e.target.value)}
                className={`inputBox ${errors.yearEmptyError || errors.formError || errors.yearError ? `errorBox` : `` }`}      
              />
              { errors.yearEmptyError ? <p className="errorText">This field is required</p> : null }
              { errors.yearError ? <p className="errorText">Must be in the past</p> : null}
            </label>
          </div>
          <div className="submitButton">
            <button type="submit" onClick={runProgram}><img src={arrow} alt="Submit" /></button>
          </div>
          <hr className="divider"/>
        </form>
      <div className="results">
        <h2><strong>{data.yearResult}</strong> years</h2>
        <h2><strong>{data.monthResult}</strong> months</h2>
        <h2><strong>{data.dayResult}</strong> days</h2>
      </div>
    </div>
    </>
  )
}

export default App
