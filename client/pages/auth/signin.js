import {
Flex,
Box,
FormControl,
FormLabel,
Input,
Checkbox,
Stack,
Link,
Button,
Heading,
Text,
useColorModeValue,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useRequest } from '../../hooks/useRequest';
import { authenticate } from '../../utils/authenticate';

export default function SimpleCard() {

    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {doRequest, errors} = useRequest({
        url: '/api/auth/signin',
        method: 'post',
        body: {
            email, password
        },
        // onSuccess: () => router.push('/')
    })

    const onClick = async () => {
        await doRequest()
    }


return (
    <Flex
    minH={'100vh'}
    align={'center'}
    justify={'center'}
    bg={useColorModeValue('gray.50', 'gray.800')}>
    <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
        <Heading fontSize={'4xl'}>Sign in to your account</Heading>
        <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
        </Text>
        </Stack>
        <Box
        rounded={'lg'}
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow={'lg'}
        p={8}>
        <Stack spacing={4}>
            <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input value={email} onChange={e => setEmail(e.target.value)} type="email" />
            </FormControl>
            <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input value={password} onChange={e => setPassword(e.target.value)} type="password" />
            </FormControl>
            <Stack spacing={10}>
            <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Link color={'blue.400'}>Forgot password?</Link>
            </Stack>
            <Button
                onClick={onClick}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                bg: 'blue.500',
                }}>
                Sign in
            </Button>
            </Stack>
        </Stack>
        </Box>
    </Stack>
    </Flex>
);
}

export const getServerSideProps = authenticate(async () => {
    return {
        props: {

        }
    }
})
  