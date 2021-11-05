export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
    [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
};

export type Users = {
    __typename?: 'List';
    users?: Maybe<Array<Maybe<User>>>;
};

export type ListUsersArgs = {
    id?: Maybe<Scalars['String']>;
};

export type User = {
    __typename?: 'Item';
    id: Scalars['String'];
    name?: Maybe<Scalars['String']>;
    mail: Scalars['String'];
    password: Scalars['String'];
};

export type Query = {
    __typename?: 'Query';
    users?: Maybe<Array<Maybe<User>>>;
    user?: Maybe<Array<Maybe<User>>>;
};

export type Mutation = {
    __typename?: 'Mutation';
    registerUser?: Maybe<User>;
    updateUser?: Maybe<User>;
    login?: Maybe.<Scalars['String']>;
    deleteUser?: Maybe<Scalars['String']>;
};

export type MutationRegisterUserArgs = {
    name?: Maybe<Scalars['String']>;
    mail: Scalars['String'];
    password: Scalars['String'];
};

export type MutationUpdateUserArgs = {
    id: Scalars['String'];
    name?: Maybe<Scalars['String']>;
    mail?: Maybe<Scalars['String']>;
    password?: Maybe<Scalars['String']>;
    user?: Maybe<Array<Maybe<User>>>;
};

export type MutationLoginArgs = {
    mail: Scalars['String'];
    password: Scalars['String'];
};

export type MutationDeleteUserArgs = {
    user?: Maybe<Array<Maybe<User>>>;
};
