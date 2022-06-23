import React, { useEffect, useState } from "react";
import { Button } from "@contentful/f36-button";
import { Stack } from "@contentful/f36-core";
import { ExternalLinkIcon } from "@contentful/f36-icons";
import { Text } from "@contentful/f36-components";

const BuildTimeout = 2 * 60 * 1000;

async function triggerBuildHook()
{
	try {
		await fetch(`${process.env.REACT_APP_BUILD_HOOK}`, {
			method: "POST",
		});
	} catch (e) {
		console.error(e);
	}
}

const Sidebar = () => {
	const [buildStartTime, setBuildStartTime] = useState<Date|null>(null);

	useEffect(() => {
		let timer: ReturnType<typeof setTimeout> | undefined;

		if (buildStartTime) {
			timer = setTimeout(() => setBuildStartTime(null), BuildTimeout);
		} else {
			clearTimeout(timer);
		}

		return () => clearTimeout(timer);
	}, [buildStartTime]);

	const handleBuildClick = () => {
		setBuildStartTime(new Date());
		triggerBuildHook();
	};

	return (
		<Stack flexDirection="column" spacing="spacingM">
			<Button
				size="medium"
				isFullWidth
				isDisabled={!!buildStartTime}
				onClick={handleBuildClick}
			>
				Build preview site
			</Button>
			{buildStartTime &&
				<Text fontColor="gray500">
					Build started at {buildStartTime.toLocaleTimeString()}
				</Text>
			}
			<Button
				size="medium"
				isFullWidth
				as="a"
				href={process.env.REACT_APP_NETLIFY_URL}
				target="_blank"
				endIcon={<ExternalLinkIcon />}
			>
				Open preview site
			</Button>
		</Stack>
	);
};

export default Sidebar;
