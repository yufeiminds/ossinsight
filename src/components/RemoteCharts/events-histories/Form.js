import React, {useMemo, useState} from "react";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

const types = [
  {title: 'Stars', value: "WatchEvent"},
  {title: 'Forks', value: 'ForkEvent'},
  {title: 'PRs', value: 'PullRequestEvent'}
]

const allYears = [1, 2, 5, 10]

const allLimits = [10, 20, 50]

export const useForm = ({ noSearch }) => {

  const random = useMemo(() => Math.random(), [])

  const {initialType, initialLimits, initialYears} = useMemo(() => {
    let initialType = types[0].value
    let initialYears = 1
    let initialLimits = 10
    if (!noSearch && typeof window !== 'undefined') {
      const usp = new URLSearchParams(location.search)
      const type = usp.get('type')
      const years = parseInt(usp.get('years'))
      const limits = parseInt(usp.get('n'))
      if (type && types.find(({value}) => value === type)) {
        initialType = type
      }
      if (years && allYears.indexOf(years) >= 0) {
        initialYears = years
      }
      if (limits && allLimits.indexOf(limits) >= 0) {
        initialLimits = limits
      }

    }
    return {initialType, initialYears, initialLimits}
  }, [])

  const [type, setType] = useState(initialType)
  const [n, setN] = useState(initialLimits)
  const [years, setYears] = useState(initialYears)

  const query = useMemo(() => {
    if (!noSearch && typeof window !== 'undefined') {
      const usp = new window.URLSearchParams()
      usp.set('type', type)
      usp.set('n', String(n))
      usp.set('years', String(years))
      window.history.replaceState(null, null, '?' + usp.toString())
    }

    return {
      event: type,
      n,
      years
    }
  }, [type, n, years])

  const form = (
    <Stack direction='row' sx={{flexWrap: 'wrap', alignItems: 'flex-end', gap: 4}}>
      <FormControl variant="standard" sx={{minWidth: '120px', maxWidth: '120px'}}>
        <InputLabel id={`cubechart-${random}-type`}>Type</InputLabel>
        <Select
          id={`cubechart-${random}-type`}
          value={type}
          onChange={e => setType(e.target.value)}
          label="Type"
          size='small'
        >
          {types.map(type => <MenuItem key={type.value} value={type.value}>{type.title}</MenuItem>)}
        </Select>
      </FormControl>
      <FormControl variant="standard" sx={{minWidth: '120px', maxWidth: '120px'}}>
        <TextField
          variant="standard"
          id={`cubechart-${random}-type`}
          select
          value={n}
          onChange={e => setN(e.target.value)}
          InputProps={{
            startAdornment: <InputAdornment position="start">Top</InputAdornment>
          }}
        >
          {allLimits.map(n => <MenuItem key={n} value={n}>{n}</MenuItem>)}
        </TextField>
      </FormControl>
      <FormControl variant="standard" sx={{minWidth: '220px', maxWidth: '220px'}}>
        <TextField
          variant="standard"
          id={`cubechart-${random}-type`}
          value={years}
          onChange={e => setYears(e.target.value)}
          select
          InputProps={{
            startAdornment: <InputAdornment position="start">Recent</InputAdornment>,
            endAdornment: <InputAdornment position="start" sx={{mr: 4}}>Year(s)</InputAdornment>
          }}
        >
          {allYears.map(n => <MenuItem key={n} value={n}>{n}</MenuItem>)}
        </TextField>
      </FormControl>
    </Stack>
  )

  return {form, query}
}