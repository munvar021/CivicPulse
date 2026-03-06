import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import toast from "../../utils/toast";
import ButtonLoader from "../Loaders/buttonLoader";
import api from "../../services/api";
import {
  Container,
  Card,
  Title,
  Subtitle,
  Form,
  InputGroup,
  Label,
  PasswordWrapper,
  PasswordInput,
  PasswordToggle,
  ErrorMessage,
  Button,
  BackLink,
} from "./accessGateStyles";

const AccessGate = ({ children, redirectPath = "/" }) => {
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (isLocked) {
      toast.error("Too many failed attempts. Please try again later.");
      return;
    }

    setLoading(true);

    try {
      await api.post(
        "/superadmin/verify-access",
        {},
        {
          headers: {
            "x-admin-access-code": data.accessCode,
          },
        },
      );

      setIsAuthorized(true);
      toast.success("Access granted");
    } catch (error) {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      if (newAttempts >= 3) {
        setIsLocked(true);
        toast.error("Access denied. Too many failed attempts.");
        setTimeout(() => navigate(redirectPath), 2000);
      } else {
        toast.error(
          `Invalid access code. ${3 - newAttempts} attempts remaining.`,
        );
      }
    } finally {
      setLoading(false);
    }
  };

  if (isAuthorized) {
    return children;
  }

  return (
    <Container>
      <Card>
        <Title>🔒 Restricted Access</Title>
        <Subtitle>Enter access code to continue</Subtitle>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputGroup>
            <Label>Access Code</Label>
            <PasswordWrapper>
              <PasswordInput
                type={showPassword ? "text" : "password"}
                placeholder="Enter access code"
                disabled={isLocked || loading}
                $error={errors.accessCode || attempts > 0}
                autoFocus
                {...register("accessCode", {
                  required: "Access code is required",
                })}
              />
              <PasswordToggle
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </PasswordToggle>
            </PasswordWrapper>
            {errors.accessCode && (
              <ErrorMessage>{errors.accessCode.message}</ErrorMessage>
            )}
          </InputGroup>
          <Button type="submit" disabled={isLocked || loading}>
            {loading ? <ButtonLoader size="small" /> : "Verify Access"}
          </Button>
        </Form>
        <BackLink onClick={() => navigate(redirectPath)} disabled={loading}>
          ← Back to Home
        </BackLink>
      </Card>
    </Container>
  );
};

export default AccessGate;
