import CustomButton from '~root/components/CustomButton'

export default function IntroductionScreen() {
    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <div className='w-3/5 flex flex-col items-center p-10 bg-white shadow rounded-xl'>
                <h1 className='text-7xl text-orange-400'>Hello</h1>
                <p className='text-4xl my-6'>Welcome to my solution!</p>
                <div className='mt-8'>
                    <div className='flex flex-col items-center'>
                        <h4 className='text-2xl mb-4'>Challenge 1 (Availability Function)</h4>
                        <p className='w-2/3 leading-6 text-center'>
                            {
                                "In this challenge, I have made the same user interface and logic which allow user to pick their available weeks. I also add one more feature to make this challenge more interesting. You can create new users with some basic information, pick available weeks and save. Then, these user will be saved, filtered by certain conditions and showed in Challenge 2's section"
                            }
                        </p>
                    </div>
                    <div className='flex flex-col items-center mt-8'>
                        <h4 className='text-2xl mb-4 '>
                            Challenge 2 (User’s Availability Results Function)
                        </h4>
                        <p className='w-2/3 leading-6 text-center'>
                            In this challenge, the same user interface and logic have been made with
                            a few tiny differences. The above saved users will be showed in this
                            section. I also assume that this week is Week 1. You can see list of
                            available users by click through the options or filtering them by a
                            particular week. You should add more than two users to tinker and test
                            this challenge.
                        </p>
                    </div>
                </div>
                <CustomButton
                    title='Go to Solutions'
                    type='link'
                    href='/challenges'
                    className='mt-10 no-underline px-4 py-2 rounded-md text-lg bg-orange-400  hover:bg-orange-500 transition-all'
                />
            </div>
        </div>
    )
}
