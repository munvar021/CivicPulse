import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../../context/authContext";
import ButtonLoader from "../../../components/Loaders/buttonLoader";
import {
  Container,
  FormCard,
  Title,
  Form,
  InputGroup,
  Label,
  Input,
  Button,
  LinkText,
  StyledLink,
  ErrorMessage,
  PasswordWrapper,
  PasswordInput,
  PasswordToggle,
  Spinner,
} from "../authStyles";
import toast from "../../../utils/toast";

const LoginForm = ({ title, role, navigateTo, showRegisterLink = false }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password, role);
      toast.success("Login successful!");
      navigate(navigateTo);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed";
      toast.error(errorMessage);
    }
  };

  return (
    <Container>
      <FormCard>
        <Title>{title}</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputGroup>
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="Enter your email"
              $error={errors.email}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email format",
                },
              })}
            />
            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
          </InputGroup>
          <InputGroup>
            <Label>Password</Label>
            <PasswordWrapper>
              <PasswordInput
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                $error={errors.password}
                {...register("password", { required: "Password is required" })}
              />
              <PasswordToggle
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </PasswordToggle>
            </PasswordWrapper>
            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
          </InputGroup>
          <Button type="submit" disabled={loading}>
            {loading ? <ButtonLoader size="small" /> : "Login"}
          </Button>
        </Form>
        {showRegisterLink && (
          <LinkText>
            Don't have an account?{" "}
            <StyledLink to="/citizen/register">Register here</StyledLink>
          </LinkText>
        )}
        <LinkText>
          <StyledLink to="/login">← Back to role selection</StyledLink>
        </LinkText>
      </FormCard>
    </Container>
  );
};

export default LoginForm;
