import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { register as registerAction } from "../../../store/slices/authSlice";
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

const RegisterForm = ({ title, role, navigateTo, loginPath }) => {
  const {
    register: registerHookForm,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const password = watch("password");

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const userData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
      };

      await dispatch(registerAction({ userData, role })).unwrap();
      toast.success("Registration successful!");
      navigate(navigateTo, { replace: true });
    } catch (error) {
      toast.error(error || "Registration failed");
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
            <Label>Full Name</Label>
            <Input
              type="text"
              placeholder="Enter your full name"
              $error={errors.name}
              {...registerHookForm("name", {
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
              })}
            />
            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
          </InputGroup>
          <InputGroup>
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="Enter your email"
              $error={errors.email}
              {...registerHookForm("email", {
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
            <Label>Phone</Label>
            <Input
              type="tel"
              placeholder="Enter your phone number"
              $error={errors.phone}
              {...registerHookForm("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Phone number must be 10 digits",
                },
              })}
            />
            {errors.phone && (
              <ErrorMessage>{errors.phone.message}</ErrorMessage>
            )}
          </InputGroup>
          <InputGroup>
            <Label>Password</Label>
            <PasswordWrapper>
              <PasswordInput
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                $error={errors.password}
                {...registerHookForm("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Password must contain at least one uppercase, one lowercase, one number, and one special character",
                  },
                })}
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
          <InputGroup>
            <Label>Confirm Password</Label>
            <PasswordWrapper>
              <PasswordInput
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                $error={errors.confirmPassword}
                {...registerHookForm("confirmPassword", {
                  required: "Confirm password is required",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />
              <PasswordToggle
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <FontAwesomeIcon
                  icon={showConfirmPassword ? faEyeSlash : faEye}
                />
              </PasswordToggle>
            </PasswordWrapper>
            {errors.confirmPassword && (
              <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
            )}
          </InputGroup>
          <Button type="submit" disabled={loading}>
            {loading ? <ButtonLoader size="small" /> : "Register"}
          </Button>
        </Form>
        <LinkText>
          Already have an account?{" "}
          <StyledLink to={loginPath}>Login here</StyledLink>
        </LinkText>
        <LinkText>
          <StyledLink to="/login">← Back to role selection</StyledLink>
        </LinkText>
      </FormCard>
    </Container>
  );
};

export default RegisterForm;
