import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

class PostHelloBodyDTO {
	@ApiPropertyOptional({
		description: "What greeting prefix should be used?",
		default: "Hello"
	})
	@IsOptional()
	@IsString()
	public greeting?: string
}

export default PostHelloBodyDTO;
