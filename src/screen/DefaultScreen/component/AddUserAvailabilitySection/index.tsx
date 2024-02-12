import * as React from 'react'
import CustomSlider from '~root/components/CustomSlider'
import FormComponent from '~root/components/Form'
import CustomInput from '~root/components/CustomInput'
import CustomButton from '~root/components/CustomButton'
import * as Yup from 'yup'
import { IUser } from '~root/types'
import Snackbar from '@mui/material/Snackbar'

interface ICustomSlider {
    disableLabel: string
    disabled: boolean
    firstRangeValue: number[]
    checkboxValue: string
    extraRange?: boolean
}

const InputSchema = Yup.object().shape({
    username: Yup.string().required('This field is required'),
    imageUrl: Yup.string(),
})

interface IValues {
    username: string
    imageUrl: string
}

const DEFAULT_VALUE: IValues = {
    username: '',
    imageUrl: '',
}

const DEFAULT_LIST: ICustomSlider[] = [
    {
        disableLabel: 'Week 1',
        disabled: false,
        firstRangeValue: [0, (100 / 6) * 2],
        checkboxValue: 'Week 1',
    },
    {
        disableLabel: 'Week 2',
        disabled: false,
        firstRangeValue: [(100 / 6) * 2, (100 / 6) * 4],
        checkboxValue: 'Week 2',
    },
    {
        disableLabel: 'Week 3',
        disabled: true,
        firstRangeValue: [(100 / 6) * 4, 100],
        checkboxValue: 'Week 3',
    },
    {
        disableLabel: 'Week 4',
        disabled: false,
        firstRangeValue: [0, (100 / 6) * 2],
        extraRange: true,
        checkboxValue: 'Week 4',
    },
    {
        disableLabel: 'Week 5',
        disabled: false,
        firstRangeValue: [(100 / 6) * 2, (100 / 6) * 3],
        checkboxValue: 'Week 5',
    },
    {
        disableLabel: 'Week 6',
        disabled: true,
        firstRangeValue: [(100 / 6) * 4, 100],
        checkboxValue: 'Week 6',
    },
    {
        disableLabel: 'Week 7',
        disabled: false,
        firstRangeValue: [0, (100 / 6) * 3],
        extraRange: true,
        checkboxValue: 'Week 7',
    },
]

const DEFAULT_AVAILABILITY: string[] = ['Week 1', 'Week 2', 'Week 4', 'Week 5', 'Week 7']

interface IAddUserAvailabilitySectionProps {
    addUser: (user: IUser) => void
}

// Challenge 1 (Availability Function)
export default function AddUserAvailabilitySection(props: IAddUserAvailabilitySectionProps) {
    const { addUser } = props
    const [availability, setAvailability] = React.useState<string[]>(DEFAULT_AVAILABILITY)
    const [openSnackbar, setOpenSnackbar] = React.useState<boolean>(false)

    const handleModifyAvailabilty = (week: string) => {
        if (availability.includes(week)) {
            setAvailability((currentAvailability) =>
                currentAvailability.filter((weekItem) => weekItem !== week),
            )
        } else {
            setAvailability([...availability, week])
        }
    }

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false)
    }

    return (
        <div className='w-3/5 flex flex-col items-center bg-white rounded-xl shadow py-6'>
            <h4 className='font-bold text-3xl text-orange-400'>Add new user and availability</h4>
            <FormComponent
                className='w-full my-10 mt-4 flex flex-col items-center'
                initialValues={DEFAULT_VALUE}
                validationSchema={InputSchema}
                onSubmit={(values, { resetForm }) => {
                    const newUser = { ...values, availability: availability.sort() }
                    addUser(newUser)
                    setOpenSnackbar(true)
                    resetForm()
                }}
            >
                <CustomInput
                    className='w-full'
                    name='username'
                    label='Name'
                    type='text'
                    style='TextField'
                />
                <CustomInput
                    className='w-full'
                    name='imageUrl'
                    label='Image URL'
                    type='text'
                    style='TextField'
                />
                <h4 className='mt-6 font-bold text-xl text-orange-400'>
                    MY AVAILABILITY FOR THE NEXT 7 WEEKS
                </h4>
                <div className='w-full flex flex-col items-center '>
                    {DEFAULT_LIST.map((item) => (
                        <CustomSlider
                            key={item.disableLabel}
                            disableLabel={item.disableLabel}
                            disabled={item.disabled}
                            firstRangeValue={item.firstRangeValue}
                            extraRange={item.extraRange}
                            checkboxValue={item.checkboxValue}
                            modifyAvailability={handleModifyAvailabilty}
                        />
                    ))}
                </div>
                <CustomButton
                    className='w-3/5 rounded-md text-lg py-3 font-semibold mt-5 bg-orange-400 hover:cursor-pointer hover:bg-orange-500 transition-colors'
                    title='Save'
                    submit
                />
            </FormComponent>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                autoHideDuration={5000}
                open={openSnackbar}
                onClose={handleCloseSnackbar}
                message='Add new user and week availability successfully!'
                color='green'
            />
        </div>
    )
}
