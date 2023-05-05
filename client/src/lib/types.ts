import { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { AppError } from './error'

export type CustomQueryOptions<T extends (...args: any) => any> =
  UseQueryOptions<
    Awaited<ReturnType<T>>,
    AxiosError<AppError>,
    Awaited<ReturnType<T>>,
    any[]
  >

export type CustomMutationOptions<T extends (...args: any) => any> =
  UseMutationOptions<
    Awaited<ReturnType<T>>,
    AxiosError<AppError>,
    Parameters<T>[0]
  >
