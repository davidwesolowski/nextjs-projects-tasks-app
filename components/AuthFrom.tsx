'use client';

import { register, signin } from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useReducer } from "react";
import { Button } from "./Button";
import { Card } from "./Card";
import { Input } from "./Input";

const registerContent = {
    linkUrl: '/signin',
    linkText: 'Already have an account?',
    header: 'Create a new account',
    subheader: 'just a few things to get started',
    buttonText: 'Register',
}

const signinContent = {
    linkUrl: '/register',
    linkText: "Don't have an account?",
    header: 'Welcome back',
    subheader: 'Enter your credentials to acces your account',
    buttonText: 'Sign in',
}

type Mode = 'register' | 'signin'

const CONTENT_MAPPING: Record<Mode, typeof signinContent | typeof registerContent> = {
    'register': registerContent,
    'signin': signinContent
}

const INITIAL_STATE = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
}

export const AuthForm = ({ mode }: { mode: Mode }) => {
    const [userData, dispatch] = useReducer((state, newState) => ({ ...state, ...newState }), INITIAL_STATE);
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log(mode)

        try {
            if (mode === 'register') {
                await register(userData);
            } else {
                await signin(userData)
            }

            router.replace('/home');
        } catch (error) {
            console.error(error);
        } finally {
            dispatch(INITIAL_STATE);
        }
    }
    
    const content = CONTENT_MAPPING[mode];

    return (
        <Card>
            <div className="w-full">
            <div className="text-center">
                <h2 className="text-3xl mb-2">{content.header}</h2>
                <p className="tex-lg text-black/25">{content.subheader}</p>
            </div>
            <form onSubmit={handleSubmit} className="py-10 w-full">
                {mode === "register" && (
                <div className="flex mb-8 justify-between">
                    <div className="pr-2">
                    <div className="text-lg mb-4 ml-2 text-black/50">
                        First Name
                    </div>
                    <Input
                        required
                        placeholder="First Name"
                        value={userData.firstName}
                        className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
                        onChange={(e) =>
                        dispatch({ firstName: e.target.value })
                        }
                    />
                    </div>
                    <div className="pl-2">
                    <div className="text-lg mb-4 ml-2 text-black/50">Last Name</div>
                    <Input
                        required
                        placeholder="Last Name"
                        value={userData.lastName}
                        className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
                        onChange={(e) =>
                            dispatch({ lastName: e.target.value })
                        }
                    />
                    </div>
                </div>
                )}
                <div className="mb-8">
                <div className="text-lg mb-4 ml-2 text-black/50">Email</div>
                <Input
                    required
                    type="email"
                    placeholder="Email"
                    value={userData.email}
                    className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
                    onChange={(e) =>
                        dispatch({ email: e.target.value })
                    }
                />
                </div>
                <div className="mb-8">
                <div className="text-lg mb-4 ml-2 text-black/50">Password</div>
                <Input
                    required
                    value={userData.password}
                    type="password"
                    placeholder="Password"
                    className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
                    onChange={(e) =>
                        dispatch({ password: e.target.value })
                    }
                />
                </div>
                <div className="flex items-center justify-between">
                <div>
                    <span>
                    <Link
                        href={content.linkUrl}
                        className="text-blue-600 font-bold"
                    >
                        {content.linkText}
                    </Link>
                    </span>
                </div>
                <div>
                    <Button type="submit" intent="secondary">
                    {content.buttonText}
                    </Button>
                </div>
                </div>
            </form>
            </div>
        </Card>
    )
}