import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: UserResponse;
  forgotPassword: Scalars['Boolean'];
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  favourite: Scalars['Boolean'];
};


export type MutationChangePasswordArgs = {
  password: Scalars['String'];
  token: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationRegisterArgs = {
  confirmPassword: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationFavouriteArgs = {
  itemId: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  getStoreItems: Array<StorePriceResponse>;
  searchItems: Array<StorePriceResponse>;
  users: Array<User>;
  me?: Maybe<User>;
  getFavourites: Array<StorePriceResponse>;
};


export type QueryGetStoreItemsArgs = {
  limit: Scalars['Float'];
  offset: Scalars['Float'];
};


export type QuerySearchItemsArgs = {
  limit: Scalars['Float'];
  searchQuery: Scalars['String'];
};

export type StorePriceDetails = {
  __typename?: 'StorePriceDetails';
  storeId: Scalars['Float'];
  storeName: Scalars['String'];
  price: Scalars['Float'];
  saving: Scalars['Float'];
  discount: Scalars['Float'];
};

export type StorePriceResponse = {
  __typename?: 'StorePriceResponse';
  id: Scalars['Float'];
  itemId: Scalars['Float'];
  name: Scalars['String'];
  category: Scalars['String'];
  originalPrice: Scalars['Float'];
  img: Scalars['String'];
  isFavourite: Scalars['Boolean'];
  storePrices: Array<StorePriceDetails>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  name: Scalars['String'];
  email: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  user?: Maybe<User>;
  errors?: Maybe<Array<FieldError>>;
};

export type ChangePasswordMutationVariables = Exact<{
  password: Scalars['String'];
  token: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'UserResponse', user?: Maybe<{ __typename?: 'User', id: number, name: string }>, errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>> } };

export type FavouriteMutationVariables = Exact<{
  itemId: Scalars['Float'];
}>;


export type FavouriteMutation = { __typename?: 'Mutation', favourite: boolean };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: boolean };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', user?: Maybe<{ __typename?: 'User', name: string, email: string }>, errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>> } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  confirmPassword: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', user?: Maybe<{ __typename?: 'User', name: string, email: string }>, errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>> } };

export type GetFavouritesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFavouritesQuery = { __typename?: 'Query', getFavourites: Array<{ __typename?: 'StorePriceResponse', id: number, name: string, img: string, isFavourite: boolean, itemId: number, storePrices: Array<{ __typename?: 'StorePriceDetails', storeName: string, price: number, saving: number, discount: number, storeId: number }> }> };

export type GetSearchItemsQueryVariables = Exact<{
  limit: Scalars['Float'];
  searchQuery: Scalars['String'];
}>;


export type GetSearchItemsQuery = { __typename?: 'Query', searchItems: Array<{ __typename?: 'StorePriceResponse', id: number, name: string, img: string, isFavourite: boolean, itemId: number, storePrices: Array<{ __typename?: 'StorePriceDetails', storeName: string, price: number, saving: number, discount: number, storeId: number }> }> };

export type GetStoreItemsQueryVariables = Exact<{
  limit: Scalars['Float'];
  offset: Scalars['Float'];
}>;


export type GetStoreItemsQuery = { __typename?: 'Query', getStoreItems: Array<{ __typename?: 'StorePriceResponse', id: number, name: string, img: string, isFavourite: boolean, itemId: number, storePrices: Array<{ __typename?: 'StorePriceDetails', storeName: string, price: number, saving: number, discount: number, storeId: number }> }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: Maybe<{ __typename?: 'User', id: number, name: string }> };


export const ChangePasswordDocument = gql`
    mutation ChangePassword($password: String!, $token: String!) {
  changePassword(password: $password, token: $token) {
    user {
      id
      name
    }
    errors {
      field
      message
    }
  }
}
    `;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      password: // value for 'password'
 *      token: // value for 'token'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const FavouriteDocument = gql`
    mutation Favourite($itemId: Float!) {
  favourite(itemId: $itemId)
}
    `;
export type FavouriteMutationFn = Apollo.MutationFunction<FavouriteMutation, FavouriteMutationVariables>;

/**
 * __useFavouriteMutation__
 *
 * To run a mutation, you first call `useFavouriteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFavouriteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [favouriteMutation, { data, loading, error }] = useFavouriteMutation({
 *   variables: {
 *      itemId: // value for 'itemId'
 *   },
 * });
 */
export function useFavouriteMutation(baseOptions?: Apollo.MutationHookOptions<FavouriteMutation, FavouriteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FavouriteMutation, FavouriteMutationVariables>(FavouriteDocument, options);
      }
export type FavouriteMutationHookResult = ReturnType<typeof useFavouriteMutation>;
export type FavouriteMutationResult = Apollo.MutationResult<FavouriteMutation>;
export type FavouriteMutationOptions = Apollo.BaseMutationOptions<FavouriteMutation, FavouriteMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    user {
      name
      email
    }
    errors {
      field
      message
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($name: String!, $email: String!, $password: String!, $confirmPassword: String!) {
  register(
    password: $password
    email: $email
    name: $name
    confirmPassword: $confirmPassword
  ) {
    user {
      name
      email
    }
    errors {
      field
      message
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      confirmPassword: // value for 'confirmPassword'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const GetFavouritesDocument = gql`
    query GetFavourites {
  getFavourites {
    id
    name
    img
    isFavourite
    itemId
    storePrices {
      storeName
      price
      saving
      discount
      storeId
    }
  }
}
    `;

/**
 * __useGetFavouritesQuery__
 *
 * To run a query within a React component, call `useGetFavouritesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFavouritesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFavouritesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetFavouritesQuery(baseOptions?: Apollo.QueryHookOptions<GetFavouritesQuery, GetFavouritesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFavouritesQuery, GetFavouritesQueryVariables>(GetFavouritesDocument, options);
      }
export function useGetFavouritesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFavouritesQuery, GetFavouritesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFavouritesQuery, GetFavouritesQueryVariables>(GetFavouritesDocument, options);
        }
export type GetFavouritesQueryHookResult = ReturnType<typeof useGetFavouritesQuery>;
export type GetFavouritesLazyQueryHookResult = ReturnType<typeof useGetFavouritesLazyQuery>;
export type GetFavouritesQueryResult = Apollo.QueryResult<GetFavouritesQuery, GetFavouritesQueryVariables>;
export const GetSearchItemsDocument = gql`
    query GetSearchItems($limit: Float!, $searchQuery: String!) {
  searchItems(limit: $limit, searchQuery: $searchQuery) {
    id
    name
    img
    isFavourite
    itemId
    storePrices {
      storeName
      price
      saving
      discount
      storeId
    }
  }
}
    `;

/**
 * __useGetSearchItemsQuery__
 *
 * To run a query within a React component, call `useGetSearchItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSearchItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSearchItemsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      searchQuery: // value for 'searchQuery'
 *   },
 * });
 */
export function useGetSearchItemsQuery(baseOptions: Apollo.QueryHookOptions<GetSearchItemsQuery, GetSearchItemsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSearchItemsQuery, GetSearchItemsQueryVariables>(GetSearchItemsDocument, options);
      }
export function useGetSearchItemsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSearchItemsQuery, GetSearchItemsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSearchItemsQuery, GetSearchItemsQueryVariables>(GetSearchItemsDocument, options);
        }
export type GetSearchItemsQueryHookResult = ReturnType<typeof useGetSearchItemsQuery>;
export type GetSearchItemsLazyQueryHookResult = ReturnType<typeof useGetSearchItemsLazyQuery>;
export type GetSearchItemsQueryResult = Apollo.QueryResult<GetSearchItemsQuery, GetSearchItemsQueryVariables>;
export const GetStoreItemsDocument = gql`
    query GetStoreItems($limit: Float!, $offset: Float!) {
  getStoreItems(limit: $limit, offset: $offset) {
    id
    name
    img
    isFavourite
    itemId
    storePrices {
      storeName
      price
      saving
      discount
      storeId
    }
  }
}
    `;

/**
 * __useGetStoreItemsQuery__
 *
 * To run a query within a React component, call `useGetStoreItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStoreItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStoreItemsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetStoreItemsQuery(baseOptions: Apollo.QueryHookOptions<GetStoreItemsQuery, GetStoreItemsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetStoreItemsQuery, GetStoreItemsQueryVariables>(GetStoreItemsDocument, options);
      }
export function useGetStoreItemsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStoreItemsQuery, GetStoreItemsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetStoreItemsQuery, GetStoreItemsQueryVariables>(GetStoreItemsDocument, options);
        }
export type GetStoreItemsQueryHookResult = ReturnType<typeof useGetStoreItemsQuery>;
export type GetStoreItemsLazyQueryHookResult = ReturnType<typeof useGetStoreItemsLazyQuery>;
export type GetStoreItemsQueryResult = Apollo.QueryResult<GetStoreItemsQuery, GetStoreItemsQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    name
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const namedOperations = {
  Query: {
    GetFavourites: 'GetFavourites',
    GetSearchItems: 'GetSearchItems',
    GetStoreItems: 'GetStoreItems',
    Me: 'Me'
  },
  Mutation: {
    ChangePassword: 'ChangePassword',
    Favourite: 'Favourite',
    ForgotPassword: 'ForgotPassword',
    Login: 'Login',
    Logout: 'Logout',
    Register: 'Register'
  }
}