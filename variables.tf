variable "aws_region" {
  description = "AWS 지역 설정"
  type        = string
  default     = "ap-northeast-2"
}

variable "slack_webhook_url" {
  description = "Slack Webhook URL"
  type        = string
} 