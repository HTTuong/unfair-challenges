import * as React from 'react'
import { styled } from '@mui/material/styles'
import { Checkbox } from '@mui/joy'
import Slider from '@mui/joy/Slider'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

export interface ICustomSliderProps {
    disableLabel: string
    disabled: boolean
    firstRangeValue: number[]
    checkboxValue: string
    extraRange?: boolean
    modifyAvailability: (week: string) => void
}

const Mui_CustomSlider1 = styled(Slider)(
    () => `

    && .css-17u53z3 {
        z-index: 1;
    }

   && .css-1jq9w0k-JoySlider-track {
    z-index: 10;
   }

   && .css-hayzob-JoySlider-thumb {
    z-index: 99;
   }

   && .MuiSlider-mark.css-vf7ce7{
    z-index: 20;
   }


  `,
)

// && .css-sl4hj6-JoySlider-valueLabel{
//     min-width: 0px
//     padding-inline: unset
// }

// && span.MuiSlider-valueLabel MuiSlider-valueLabelOpen css-sl4hj6-JoySlider-valueLabel {
//     min-width: 0px
//     padding-inline: unset
// }

const Mui_CustomSlider2 = styled(Slider)(
    () => `
   && .css-17u53z3 {
    z-index: -1;
   }

   && .css-vf7ce7{
    z-index: -1;
   }

    && .css-1derak0 {
        z-index: -1;
    }

  `,
)

// && .css-sl4hj6-JoySlider-valueLabel{
//     min-width: 0
//     padding-inline: unset
// }

// && .css-sl4hj6-JoySlider-valueLabel::before {
//     color: #000
// }

const marks = [
    {
        value: 0,
        label: 'Monday',
    },
    {
        value: 100 / 6,
        label: 'Tuesday',
    },
    {
        value: (100 / 6) * 2,
        label: 'Wednesday',
    },
    {
        value: (100 / 6) * 3,
        label: 'Thursday',
    },
    {
        value: (100 / 6) * 4,
        label: 'Friday',
    },
    {
        value: (100 / 6) * 5,
        label: 'Saturday',
    },
    {
        value: 100,
        label: 'Sunday',
    },
]

function valueText(value: number) {
    return `${value}`
}

function valueLabelFormat(value: number) {
    return ''
}

export default function CustomSlider(props: ICustomSliderProps) {
    const [value1, setValue1] = React.useState<any>(props.firstRangeValue)
    const [value2, setValue2] = React.useState<any>([(100 / 6) * 5, 100])

    const [disable, setDisable] = React.useState(props.disabled)
    const [extraRange, setExtraRange] = React.useState<boolean>(
        props.extraRange ? props.extraRange : false,
    )

    const handleChange1 = (event: Event, newValue: number | number[]) => {
        if (!disable) {
            setValue1((currentValue1: number[]) => {
                if (Array.isArray(newValue) && newValue[1].toFixed(1) === value2[0].toFixed(1)) {
                    setValue2((currentValue2: number[]) => {
                        if (currentValue2[0].toFixed(1) === currentValue2[1].toFixed(1)) {
                            return [currentValue2[0] + 100 / 6, currentValue2[1] + 100 / 6]
                        } else {
                            return [currentValue2[0] + 100 / 6, currentValue2[1]]
                        }
                    })
                }
                return newValue
            })
        } else {
            setValue1(newValue as number[])
        }
    }

    const handleChange2 = (event: Event, newValue: number | number[]) => {
        setValue2((currentValue2: number[]) => {
            if (Array.isArray(newValue) && newValue[0].toFixed(1) === value1[1].toFixed(1)) {
                setValue1((currentValue1: number[]) => {
                    if (currentValue1[0].toFixed(1) === currentValue1[1].toFixed(1)) {
                        return [currentValue1[0] - 100 / 6, currentValue1[1] - 100 / 6]
                    } else {
                        return [currentValue1[0], currentValue1[1] - 100 / 6]
                    }
                })
            }
            return newValue
        })
    }

    const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDisable((prev) => !prev)
        props.modifyAvailability(event.target.value)
    }

    const handleToggleExtraRange = () => {
        if (!disable) {
            setExtraRange((prev) => !prev)
        }
    }

    return (
        <div className='w-full flex flex-col items-center'>
            <div className='w-full flex items-center justify-around  py-6'>
                <div className='flex items-center ml-6'>
                    <Checkbox
                        label={props.disableLabel}
                        variant='solid'
                        checked={!disable}
                        onChange={handleChangeCheckbox}
                        value={props.checkboxValue}
                    />
                </div>
                <div className='w-3/5 flex items-center'>
                    <div className='w-full '>
                        <Mui_CustomSlider1
                            sx={{ width: '100%' }}
                            track='normal'
                            disabled={disable}
                            aria-label='Always visible'
                            value={value1}
                            getAriaValueText={valueText}
                            onChange={handleChange1}
                            step={100 / 6}
                            marks={marks}
                            valueLabelDisplay='on'
                            valueLabelFormat={valueLabelFormat}
                        />
                    </div>
                    {extraRange && (
                        <div className='w-full  ml-[-100%]'>
                            <Mui_CustomSlider2
                                sx={{ width: '100%' }}
                                track='normal'
                                disabled={disable}
                                aria-label='Always visible'
                                value={value2}
                                getAriaValueText={valueText}
                                onChange={handleChange2}
                                step={100 / 6}
                                marks={marks}
                                valueLabelDisplay='on'
                                valueLabelFormat={valueLabelFormat}
                            />
                        </div>
                    )}
                </div>
                <div
                    className='p-1 cursor-pointer border-[1px] border-solid border-black  mr-6 flex items-center'
                    onClick={handleToggleExtraRange}
                >
                    {!extraRange && <AddIcon fontSize='small' />}
                    {extraRange && <RemoveIcon fontSize='small' />}
                </div>
            </div>
        </div>
    )
}
