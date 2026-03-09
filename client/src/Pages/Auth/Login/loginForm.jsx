import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { login } from "../../../store/slices/authSlice";
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
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await dispatch(
        login({ email: data.email, password: data.password, role }),
      ).unwrap();
      toast.success("Login successful!");
      navigate(navigateTo, { replace: true });
    } catch (error) {
      toast.error(error || "Login failed");
    } finally {
      setLoading(false);
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
              disabled={loading}
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
                disabled={loading}
                {...register("password", { required: "Password is required" })}
              />
              <PasswordToggle
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
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
